import User from "../models/User";
import Post from "../models/Post";
import { errors, slugify } from "../utils";
import { postFactory, userFactory } from "../utils/factories";

export async function getUserByEmail(email) {
  try {
    const user = await User.findByEmail(email);
    return user.toJSON();
  } catch (err) {
    console.error(errors.notfound.message);
  }
}

export async function getUserById(_id) {
  try {
    const user = await User.findOne({ _id }).populate("posts").exec();
    const publicPosts = user.posts.filter((post) => post.published);
    user.posts = publicPosts;
    return user.toJSON();
  } catch (err) {
    console.error(errors.notfound.message);
  }
}

export async function getMe(_id) {
  try {
    const user = await User.findOne({ _id }).populate("posts").exec();
    return user.toJSON();
  } catch (err) {
    console.error(errors.notfound.message);
  }
}

export async function createPost(body, userId) {
  try {
    const newPost = new Post({
      ...body,
      author: userId,
    });

    const savedPost = await newPost.save();

    if (savedPost) {
      const author = await User.findOne({
        _id: userId,
      });
      if (author) {
        author.posts.push(savedPost._id);
        await author.save();
      }
      return {
        post: savedPost.toJSON(),
        user: author && author.toJSON(),
      };
    } else throw new Error(errors.save.message);
  } catch (err) {
    console.error(err);
  }
}

export async function publishPost(postId, userId) {
  try {
    const post = await Post.findOne({ _id: postId }).exec();
    if (post) {
      if (post.published) return { post: new postFactory(post), status: 304 };
      const publishedDate = new Date();
      post.published = publishedDate.toDateString();
      const savedPost = await post.save();
      return { post: new postFactory(savedPost), status: 200 };
    } else {
      throw new Error(errors.badrequest.message);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function deletePost(postId, userId) {
  try {
    const post = await Post.findOne({ _id: postId }).exec();
    const user = await User.findOne({ _id: userId }).exec();
    if (user?._id.toString() === post?.author.toString()) {
      const updatedPosts = user.posts.filter((post) => post !== postId);
      const deletedPost = await post.remove();
      user.posts = updatedPosts;
      await user.save();
      return deletedPost;
    } else throw new Error("must be owner");
  } catch (err) {
    console.error(err);
  }
}

export async function updateLike(postId, userId) {
  try {
    const postFilter = { _id: postId };
    const userFilter = { _id: userId };
    const post = await Post.findOne(postFilter).exec();
    const user = await User.findOne(userFilter).exec();
    let type;
    if (post) {
      if (post.likes.includes(userId)) {
        type = "remove";
        post.likes = post.likes.filter((id) => id.toString() !== userId);
        user.likes = user.likes.filter((id) => id.toString() !== postId);
      } else {
        type = "add";
        post.likes.push(userId);
        post.likes = [...new Set(post.likes)];
        user.likes.push(postId);
        user.likes = [...new Set(user.likes)];
      }
      console.log("🔵 type", type);
      const updatedPost = await post.save();
      const updatedUser = await user.save();

      return { type, post: updatedPost.toJSON(), user: updatedUser.toJSON() };
    } else {
      throw new Error(errors.notfound.message);
    }
  } catch (err) {
    console.error(err);
  }
}

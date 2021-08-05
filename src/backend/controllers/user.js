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
        user: author.toJSON(),
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
    return Post.deleteOne({
      _id: postId,
      author: userId,
    }).exec();
  } catch (err) {
    console.error(err);
  }
}

export async function updateLike(postId, userId) {
  try {
    const postFilter = { _id: postId };
    const filuserFilterterUser = { _id: userId };
    const post = await Post.findOne(postFilter).exec();
    const user = await User.findOne(userFilter).exec();
    if (post) {
      if (post.likes.includes(userId)) {
        post.likes = post.likes.filter((_id) => _id !== userId);
        user.likes = user.likes.filter((_id) => _id !== postId);
      } else {
        post.likes.push(userId);
        post.likes = [...new Set(post.likes)];
        user.likes.push(userId);
        user.likes = [...new Set(user.likes)];
      }
      await user.save();
      return await post.save();
    } else {
      throw new Error(errors.notfound.message);
    }
  } catch (err) {
    console.error(err);
  }
}

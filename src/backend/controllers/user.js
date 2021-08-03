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

export async function createPost(body, user) {
  const { title } = body;
  const userId = user._id || "610749f19b0f9bb065e29e18"; // @FIXME: hardcoded user id
  try {
    const newPost = new Post({
      ...body,
      slug: slugify(title),
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
    const filter = { _id: postId, author: userId };
    const update = { published: new Date() }; // update to be performed
    const post = await Post.findOne(filter).exec();
    if (post) {
      if (post.published) return { post: new postFactory(post), status: 304 };
      post.published = new Date();
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

/*

@TODO:
// -- OwnPosts
-- PublishPost
-- deletePost

*/

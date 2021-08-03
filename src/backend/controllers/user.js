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
    return user.toJSON();
  } catch (err) {
    console.error(errors.notfound.message);
  }
}

export async function createPost(
  body,
  user = { _id: "6106e125fda8ab8379b833d6" } // @FIXME: hardcoded user id as default param
) {
  const { title } = body;
  const userId = user._id || "6106e125fda8ab8379b833d6";
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
    let author = await getUserById(userId);
    if (!author) throw new Error(errors.badrequest.message);

    // check if author actually owns the post, and return it if so
    const authorsPost = await Post.findOne({ _id: postId, author: userId });
    if (!authorsPost) throw new Error(errors.badrequest.message);
    // mark post as published and save
    const post = authorsPost.publish(author._id);
    console.log("published");
    return post;
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

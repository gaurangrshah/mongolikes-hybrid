import Post from "../models/Post";
import User from "../models/User";

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
      await user.save();

      return updatedPost.likes;
      // return { type, post: updatedPost.toJSON(), user: updatedUser.toJSON() };
    } else {
      throw new Error(errors.notfound.message);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function getLikes(postId) {
  try {
    const postFilter = { _id: postId };
    const post = await Post.findOne(postFilter).exec();
    if (post) {
      return post.likes;
    }
  } catch (err) {
    console.error(err);
  }
}

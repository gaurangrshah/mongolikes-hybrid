import Post from "../models/Post";
import User from "../models/User";
import { errors } from "../utils";

export async function getPublicFeed() {
  try {
    const posts = await Post.where("published")
      .ne(null)
      .sort({ published: "desc" });
    return posts;
  } catch (err) {
    return { ...errors.server, err };
  }
}

export async function getPostsByAuthor(authorId) {
  try {
    const author = await User.findOne({ _id: authorId })
      .populate("posts")
      .sort({ published: "desc" })
      .exec();

    const publicPosts = author?.posts?.filter((post) => post.published);
    author.posts = publicPosts;
    return { author: author.toJSON() };
  } catch (err) {
    return { ...errors.server, err };
  }
}

export async function getPostBySlug(slug) {
  try {
    const post = await Post.findOne({ slug }).populate("author").exec();
    return { post: post.toJSON() };
  } catch (err) {
    return { ...errors.server, err };
  }
}

export async function getPostById(postId) {
  try {
    const post = await Post.findOne({ _id: postId }).populate("author").exec();
    return { post: post.toJSON() };
  } catch (err) {
    return { ...errors.server, err };
  }
}

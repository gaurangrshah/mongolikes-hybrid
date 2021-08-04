import Post from "../models/Post";
import User from "../models/User";
import { errors, postFactory } from "../utils";
import { userFactory } from "../utils/factories/user";

export async function getPublicFeed() {
  try {
    const posts = await Post.find()
      .lean()
      .sort({ published: "desc" })
      .populate("author")
      .exec();
    return posts?.length && posts.filter((post) => post.published);
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
    return new userFactory(author);
  } catch (err) {
    return { ...errors.server, err };
  }
}

export async function getPostBySlug(slug) {
  try {
    const post = await Post.findOne({ slug }).lean().populate("author").exec();
    return new postFactory(post, true);
  } catch (err) {
    return { ...errors.server, err };
  }
}

export async function getPostById(postId) {
  try {
    const post = Post.findOne({ _id: postId }).populate("author").exec();

    return new postFactory(post, true);
  } catch (err) {
    return { ...errors.server, err };
  }
}

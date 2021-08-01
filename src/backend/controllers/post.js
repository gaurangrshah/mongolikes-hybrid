import Post from "../models/Post";
import User from "../models/User";
import { slugify, errors } from "../utils/slugify";

// @TODO: test create Post in UI
export async function createPost(body, user) {
  const { title } = body;
  try {
    const newPost = new Post({
      ...body,
      slug: slugify(title),
      author: user._id || "6106e3a4fda8ab8379b83487", // @FIXME: hardcoded user id for testing
    });

    const savedPost = await newPost.save();

    if (savedPost) {
      const author = await User.findOne({
        _id: user._id || "6106e3a4fda8ab8379b83487",
      });
      if (author) {
        author.posts.push(savedPost._id);
        await author.save();
        console.log("🚀 | file: post.js | line 22 | author", author);
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

export async function getFeed() {
  try {
    const posts = await Post.find()
      .sort({ published: "desc" })
      .populate("author")
      .exec();
    return {
      // only return published posts
      posts: posts?.length && posts.filter((post) => post.published),
    };
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
    return { author };
  } catch (err) {
    return { ...errors.server, err };
  }
}

export async function getPostBySlug(slug) {
  try {
    const post = await Post.findOne({ slug }).populate("author").exec();
    return { post };
  } catch (err) {
    return { ...errors.server, err };
  }
}

export async function getPostById(postId) {
  try {
    const post = await Post.findOne({ _id: postId }).populate("author").exec();
    return { post };
  } catch (err) {
    return { ...errors.server, err };
  }
}

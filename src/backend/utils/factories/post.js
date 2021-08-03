import { userFactory } from "./user";

export function postFactory(data, related = false) {
  const obj = data?._doc ? data._doc : data;
  if (!obj._id) return data;
  delete obj.__v;
  obj._id = obj._id.toString();
  obj.createdAt = obj.createdAt.toDateString();
  obj.updatedAt = obj.updatedAt.toDateString();
  obj.published = obj.published.toDateString();
  const postAuthor = obj?.author?._doc ? obj.author._doc : obj.author;
  if (related) {
    obj.author = !Array.isArray(postAuthor)
      ? new userFactory(postAuthor)
      : obj.author;
  }

  const {
    _id,
    slug,
    title,
    body,
    author,
    likes,
    published,
    createdAt,
    updatedAt,
  } = obj;

  return {
    _id,
    slug,
    title,
    body,
    author,
    likes,
    published,
    createdAt,
    updatedAt,
  };
}

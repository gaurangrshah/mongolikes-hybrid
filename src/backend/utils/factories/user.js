import { postFactory } from "./post";

export function userFactory(data, related = false) {
  const obj = data?._doc ? data._doc : data;
  // if(obj?.toJSON) return obj.toJSON();
  // console.log(`running user factor on ${obj._id}`);
  if (!obj._id) return data;
  delete obj.__v;
  if (obj.password) delete obj.password;
  obj._id = obj._id.toString();
  obj.createdAt = obj.createdAt.toDateString();
  obj.updatedAt = obj.updatedAt.toDateString();
  if (related && obj?.posts?.length) {
    if (!Number(typeof obj.posts[0])) {
      // iterate over posts only if the array is an array of objects
      obj.posts = obj.posts.map((post) => new postFactory(post));
    } else {
      // check ensuring it's not an array of post ids
      obj.posts = obj.posts;
    }
  }
  // console.log("user🏭");

  const { _id, name, username, email, image, posts, likes } = obj;

  return {
    _id,
    name,
    username,
    email,
    image,
    posts,
    likes,
  };
}

// @TODO: rename // used by index route
export function update1(data, updatedPost, user, type) {
  if (type === "add") {
    return data.map((post) => {
      if (post._id === updatedPost._id) {
        return updatedPost;
      }
      return post;
    });
  } else if (type === "remove") {
    return data.filter((post) => post._id !== updatedPost._id);
  }
}

// @TODO: rename // used by dashboard route
export function update2(data, updatedPost, user, type) {
  console.log("working");
  if (type === "add") {
    return {
      ...data,
      posts: [...data.posts, updatedPost],
      likes: [...data.likes, user],
    };
  } else if (type === "remove") {
    return {
      ...data,
      posts: data.posts.filter((post) => post._id !== updatedPost._id),
      likes: data.likes.filter((like) => like._id !== user._id),
    };
  }
}

// @TODO: rename // used by post/id/:id route
export function update3(updatedPost, user, type) {
  if (type === "add") {
    return {
      ...updatedPost,
      likes: [...updatedPost.likes, user],
    };
  } else if (type === "remove") {
    return {
      ...updatedPost,
      likes: updatedPost.likes.filter((user) => user !== user._id),
    };
  }
}

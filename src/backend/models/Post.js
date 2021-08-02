const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    body: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
    },
    image: String,
    published: { type: Date },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);

PostSchema.pre("remove", function (next) {});

PostSchema.methods.publish = function (authorId) {
  if (this.published) throw new Error("This post is already published.");
  if (this.author.id.toString() === authorId.toString()) {
    this.published = new Date();
    const newPost = this.save();
    return newPost.toJSON();
  } else throw new Error("You must be the author to perform this action!");
};

PostSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  delete obj.author.password;
  obj._id = obj._id.toString();
  obj.createdAt = obj.createdAt.toString();
  obj.updatedAt = obj.updatedAt.toString();
  return obj;
};

export default mongoose.models.Post || mongoose.model("Post", PostSchema);

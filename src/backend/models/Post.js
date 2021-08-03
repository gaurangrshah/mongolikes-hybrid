const mongoose = require("mongoose");

export const PostSchema = new mongoose.Schema(
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
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

PostSchema.methods.publish = function () {
  this.published = new Date();
  const post = this.save();
  return post.toJSON();
};

PostSchema.methods.toJSON = function () {
  var obj = this && this?.toObject();
  if (!obj) return;
  delete obj?.__v;
  obj._id = obj?._id?.toString();
  obj.published = obj?.published?.toDateString();
  obj.createdAt = obj?.createdAt?.toDateString();
  obj.updatedAt = obj?.updatedAt?.toDateString();
  if (obj?.author?.toJSON) obj.author.toJSON();
  return obj;
};

export default mongoose.models.Post || mongoose.model("Post", PostSchema);

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

PostSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  obj._id = obj._id.toString();
  obj.createdAt = obj.createdAt.toString();
  obj.updatedAt = obj.updatedAt.toString();
  return obj;
};

export default mongoose.models.Post || mongoose.model("Post", PostSchema);

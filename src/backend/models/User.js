const mongoose = require("mongoose");

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      // required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: [6, "Sorry must be longer than 6 chars"],
    },
    emailVerified: {
      type: Date,
    },
    image: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      minLength: [6, "Sorry password must be longer than 6 chars"],
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);

UserSchema.statics.findByEmail = async function (email) {
  const currentUser = this;
  const user = await currentUser.findOne({ email }).exec();

  if (!user) {
    console.log("findbycredentials: user does not exist");
    return Promise.resolve(false);
  }
  return user;
};

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  delete obj.role;
  delete obj.createdAt;
  delete obj.updatedAt;
  obj._id = obj._id.toString();
  return obj;
};

export default mongoose.models.User || mongoose.model("User", UserSchema);

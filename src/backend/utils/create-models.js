import mongoose from "mongoose";
import { UserSchema } from "../models/User";
import { PostSchema } from "../models/Post";

const schemas = {
  User: UserSchema,
  Post: PostSchema,
};

export const createModels = () => {
  try {
    const modelNames = mongoose.modelNames();
    Object.entries(schemas).forEach(([name, schema]) => {
      if (!modelNames.includes(name)) {
        mongoose.model(name, schema);
      }
    });
    console.log("Models created");
  } catch (err) {
    console.error("createModels", err);
  }
};

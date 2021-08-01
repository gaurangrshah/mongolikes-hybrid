import mongoose from "mongoose";
import dbConnect from "../services/mongoose";

const db = async (req, res, next) => {
  //@link: https://mongoosejs.com/docs/api.html#connection_Connection-readyState
  if (mongoose.connections[0].readyState !== 1) {
    await dbConnect();
  }
  return next();
};
export default db;

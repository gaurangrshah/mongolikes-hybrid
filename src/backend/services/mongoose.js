import mongoose from "mongoose";
import { createModels } from "../utils";

const connection = {}; // creating connection object

export const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false, // uses findOneAndUpdate instead
};

async function dbConnect() {
  // is connection already established?
  if (connection.isConnected) {
    return;
  }
  // connecting to db
  const db = await mongoose.connect(process.env.MONGO_DB_URI, options);

  connection.isConnected = db.connections[0].readyState;
  createModels();
  return connection;
}

export default dbConnect;

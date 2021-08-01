const mongoose = require("mongoose");

const connection = {}; /* creating connection object*/

export const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false, // uses findOneAndUpdate instead
};

async function db() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }
  /* connecting to our database */
  const db = await mongoose.connect(process.env.MONGO_DB_URI, options);
  connection.isConnected = db.connections[0].readyState;
  // console.log(db)
  return connection;
}

module.exports = db;

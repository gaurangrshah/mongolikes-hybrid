import mongoose from "mongoose";
import nc from "next-connect";

import middleware from "@/backend/middleware";
import seedFaker from "@/backend/services/faker";
import { errors, onError } from "@/backend/utils";

function seeder(req, res) {
  if (!process.env.NODE_ENV === "development") return;
  mongoose.connection.db.listCollections().toArray((err, collectionNames) => {
    if (err) {
      return res
        .status(errors.internalServerError.status)
        .json(errors.internalServerError);
    }

    if (collectionNames.includes("users")) {
      mongoose.connection.dropCollection("users", function (err, result) {
        if (err) {
          return console.log(errors.notmodified.message, err.stack);
        }
        console.log("dropped user collection successully!", result);
      });
    }

    if (collectionNames.includes("posts")) {
      mongoose.connection.dropCollection("posts", function (err, result) {
        if (err) {
          return console.log(errors.notmodified.message, err.stack);
        }
        console.log("dropped posts collection successully!", result);
      });
    }

    seedFaker();
  });

  res.status(200).json({
    message: { message: "Seeded db successfully", error: false },
  });
}

const handler = nc({ onError })
  .use(middleware)
  .post(async (req, res) => {
    await seeder(req, res);
  });

export default handler;

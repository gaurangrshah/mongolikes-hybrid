import nc from "next-connect";

import middleware, { verify } from "@/backend/middleware";
import { onError } from "@/backend/utils";
import { updateLike } from "@/backend/controllers";

const handler = nc({ onError })
  .use(verify) // 🔒 @TODO: authentication required -- populates user on request
  .use(middleware)
  .post(async (req, res) => {
    const postId = req.query.postId;
    const userId = req.user.id || "6106e3a4fda8ab8379b83487"; // @TODO: remove hardcoded userId
    console.log("🚀 | file: [postId].js | line 12 | postId", postId, userId);
    const post = await updateLike(postId, req.user._id);
    if (post) return res.json(post);
    res.status(500).json({ message: "Error finding user" });
  });

export default handler;

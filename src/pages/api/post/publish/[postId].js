import nc from "next-connect";

import middleware from "@/backend/middleware";
import { verify } from "@/backend/middleware/verify";
import { onError } from "@/backend/utils";
import { publishPost } from "@/backend/controllers";

const handler = nc({ onError })
  // .use(verify) // 🔒 @TODO: authentication required -- populates user on request
  .use(middleware)
  .post(async (req, res, user) => {
    const postId = req?.query?.postId;
    const userId = "6106e125fda8ab8379b833d6"; // @TODO: update to user._id

    const post = await publishPost(postId, userId);
    if (post) return res.json(post);
    res.status(500).json({ message: "Error creating post" });
  });

export default handler;

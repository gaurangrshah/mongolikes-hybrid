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
    const userId = "610749f19b0f9bb065e29e18"; // @TODO: update to user._id

    const response = await publishPost(postId, userId);
    if (response) return res.status(response?.status).json(response?.post);
    res.status(500).json({ message: "Error creating post" });
  });

export default handler;

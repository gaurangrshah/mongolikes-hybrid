import nc from "next-connect";

import middleware from "@/backend/middleware";
import { verify } from "@/backend/middleware/verify";

import { publishPost } from "@/backend/controllers";
import { onError, onNoMatch } from "@/backend/utils";

const handler = nc({ onNoMatch, onError })
  .use(verify) // 🔒  authentication required -- populates user on request
  .use(middleware)
  .post(async (req, res) => {
    const postId = req?.query?.postId;
    const userId = req?.user?.sub;
    const response = await publishPost(postId, userId);
    if (response) return res.status(response?.status).json(response?.post);
    res.status(500).json({ message: "Error creating post" });
  });

export default handler;

import nc from "next-connect";

import middleware from "@/backend/middleware";
import { verify } from "@/backend/middleware/verify";
import { onError } from "@/backend/utils";
import { getLikes, updateLike } from "@/backend/controllers";

const handler = nc({ onError })
  .use(middleware)
  .get(async (req, res) => {
    const postId = req.query.postId;
    const likes = await getLikes(postId);
    if (likes) return res.json(likes);
    return res.status(404).json({ error: "likes not found" });
  })
  .use(verify) // 🔒 @TODO: authentication required -- populates user on request
  .put(async (req, res) => {
    const postId = req.query.postId;
    const userId = req?.user?.sub; // @TODO: remove hardcoded userId
    const post = await updateLike(postId, userId);
    if (post) return res.json(post);
    res.status(500).json({ message: "Error finding user" });
  });

export default handler;

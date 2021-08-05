import nc from "next-connect";

import middleware from "@/backend/middleware";
import { verify } from "@/backend/middleware/verify";

import { deletePost, getPostById } from "@/backend/controllers";
import { onError, onNoMatch } from "@/backend/utils";

const handler = nc({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    const post = await getPostById(req.query.id);
    if (post._id) return res.json(post);
    res.status(500).json({ message: "!Error finding post" });
  })
  .use(verify) // 🔒 used by client api
  .delete(async (req, res) => {
    if (!req?.user) return res.status(401).json({ message: "Unauthorized" });
    const postId = req.query.id;
    const userId = req?.user?.sub;
    const post = await deletePost(postId, userId);
    if (post) return res.status(202).json(post);
    res.status(500).json({ message: "!Error deleting post" });
  });

export default handler;

import nc from "next-connect";

import middleware from "@/backend/middleware";

import { getPostBySlug } from "@/backend/controllers";
import { onError, onNoMatch } from "@/backend/utils";

const handler = nc({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    const post = await getPostBySlug(req.query.slug);
    if (post) return res.json(post);
    res.status(500).json({ message: "Error finding post" });
  });

export default handler;

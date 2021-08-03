import nc from "next-connect";

import middleware from "@/backend/middleware";
import { onError } from "@/backend/utils";
import { getPostBySlug } from "@/backend/controllers";

const handler = nc({ onError })
  .use(middleware)
  .get(async (req, res) => {
    const post = await getPostBySlug(req.query.slug);
    if (post) return res.json(post);
    res.status(500).json({ message: "Error finding post" });
  });

export default handler;

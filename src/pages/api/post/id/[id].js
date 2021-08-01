import nc from "next-connect";

import middleware from "@/backend/middleware";
import { onError } from "@/backend/utils";
import { getPostById } from "@/backend/controllers";

const handler = nc({ onError })
  .use(middleware)
  .get(async (req, res) => {
    const post = await getPostById(req.query.id);
    if (post) return res.json(post);
    res.status(500).json({ message: "Error creating post" });
  });

export default handler;

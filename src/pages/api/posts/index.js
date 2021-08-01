import nc from "next-connect";

import middleware from "@/backend/middleware";
import { verify } from "@/backend/middleware/verify";
import { onError } from "@/backend/utils";
import { createPost, getFeed } from "@/backend/controllers";

const handler = nc({ onError })
  .use(middleware)
  .get(async (req, res) => {
    const posts = await getFeed();
    if (posts) return res.json(posts);
    res.status(500).json({ message: "Error creating post" });
  });

export default handler;

import nc from "next-connect";

import middleware from "@/backend/middleware";
import { getPublicFeed } from "@/backend/controllers";
import { onError, onNoMatch } from "@/backend/utils";

const handler = nc({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    const posts = await getPublicFeed();
    if (posts) return res.json(posts);
    res.status(500).json({ message: "Error creating post" });
  });

export default handler;

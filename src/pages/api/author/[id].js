import nc from "next-connect";

import middleware from "@/backend/middleware";
import { getPostsByAuthor } from "@/backend/controllers";
import { onError, onNoMatch } from "@/backend/utils";

const handler = nc({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    if (!req?.query?.id) {
      return res.status(400).json({ error: "No id provided" });
    }
    const posts = await getPostsByAuthor(req?.query?.id);
    res.status(200).json(posts);
  });

export default handler;

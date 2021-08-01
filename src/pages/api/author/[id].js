import nc from "next-connect";

import middleware from "@/backend/middleware";
import { verify } from "@/backend/middleware/verify";
import { onError } from "@/backend/utils";
import { getPostsByAuthor } from "@/backend/controllers";

const handler = nc({ onError })
  .use(middleware)
  .get(async (req, res, user) => {
    console.log(req.db);
    if (!req?.query?.id) {
      return res.status(400).json({ error: "No id provided" });
    }
    const posts = await getPostsByAuthor(req?.query?.id);
    res.status(200).json(posts);
  });

export default handler;

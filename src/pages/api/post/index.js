import nc from "next-connect";

import middleware from "@/backend/middleware";
import { verify } from "@/backend/middleware/verify";
import { onError } from "@/backend/utils";
import { createPost } from "@/backend/controllers";

const handler = nc({ onError })
  .use(verify) // 🔒
  .use(middleware)
  .post(async (req, res, user) => {
    const post = await createPost(req.body, user);
    if (post) return res.json(post);
    res.status(500).json({ message: "Error creating post" });
  });

export default handler;

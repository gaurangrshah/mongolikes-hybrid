import nc from "next-connect";

import middleware from "@/backend/middleware";
import { onError } from "@/backend/utils";
import { createPost } from "@/backend/controllers";

//@TODO: complete create post handling
const handler = nc({ onError })
  .use(middleware)
  .post(async (req, res, user) => {
    console.log("🚀 | file: index.js | line 1 | req.body", req.body);
    const post = await createPost(req.body, user);
    if (post) return res.json(post);
    res.status(500).json({ message: "Error creating post" });
  });

export default handler;

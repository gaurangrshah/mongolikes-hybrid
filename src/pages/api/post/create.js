import nc from "next-connect";

import middleware from "@/backend/middleware";
import { verify } from "@/backend/middleware/verify";
import { onError } from "@/backend/utils";

import { createPost } from "@/backend/controllers";
import { isValidJson } from "@/utils/is-valid-json";

const handler = nc({ onError })
  .use(verify) // 🔒 used by client api
  .use(middleware)
  .post(async (req, res) => {
    const post = await createPost(
      isValidJson(req.body) ? JSON.parse(req.body) : req.body,
      req?.user?.sub
    );
    if (post) return res.json(post);
    res.status(500).json({ message: "Error creating post" });
  });

export default handler;

import nc from "next-connect";

import middleware from "@/backend/middleware";
import { createPost } from "@/backend/controllers";

import { onError, onNoMatch } from "@/backend/utils";
import { isValidJson } from "@/utils/is-valid-json";

// this is the external version to use for testing the endpoint via http client
// (bypass auth middleware) only available in development
const handler = nc({ onNoMatch, onError })
  .use(middleware)
  .post(async (req, res) => {
    if (!process.env.NODE_ENV === "development") return;
    const post = await createPost(
      isValidJson(req.body) ? JSON.parse(req.body) : req.body,
      req.query.userId
    );
    if (post) return res.json(post);
    res.status(500).json({ message: "Error creating post" });
  });

export default handler;

import nc from "next-connect";

import middleware from "@/backend/middleware";
import { onError } from "@/backend/utils";

import { createPost } from "@/backend/controllers";
import { isValidJson } from "@/utils/is-valid-json";

// this is the external version to use for testing the endpoint via http client
// (bypass auth middleware)

const handler = nc({ onError })
  .use(middleware)
  .post(async (req, res, user) => {
    const post = await createPost(
      isValidJson(req.body) ? JSON.parse(req.body) : req.body,
      req.query.userId
    );
    if (post) return res.json(post);
    res.status(500).json({ message: "Error creating post" });
  });

export default handler;

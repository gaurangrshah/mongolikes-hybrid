import nc from "next-connect";

import middleware from "@/backend/middleware";
import { verify } from "@/backend/middleware/verify";
import { onError } from "@/backend/utils";
import { getUserById } from "@/backend/controllers";

const handler = nc({ onError })
  // .use(verify) // 🔒 @TODO: authentication required -- populates user on request
  .use(middleware)
  .get(async (req, res) => {
    // @TODO: update this to return the verified use from the request

    const userId = req.query.id;
    const user = await getUserById(userId);
    if (user) return res.json(user);
    res.status(500).json({ message: "Error finding user" });
  });

export default handler;

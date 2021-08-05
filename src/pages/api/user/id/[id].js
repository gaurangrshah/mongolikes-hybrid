import nc from "next-connect";

import middleware from "@/backend/middleware";
import { getUserById } from "@/backend/controllers";
import { onError, onNoMatch } from "@/backend/utils";

const handler = nc({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    const userId = req.query.id;
    const user = await getUserById(userId);
    if (user) return res.json(user);
    res.status(500).json({ message: "Error finding user" });
  });

export default handler;

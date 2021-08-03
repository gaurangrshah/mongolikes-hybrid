import nc from "next-connect";

import middleware from "@/backend/middleware";
import { onError } from "@/backend/utils";
import { getUserById } from "@/backend/controllers";

const handler = nc({ onError })
  .use(middleware)
  .get(async (req, res) => {
    const userId = req.query.id;
    const user = await getUserById(userId);
    if (user) return res.json(user);
    res.status(500).json({ message: "Error finding user" });
  });

export default handler;

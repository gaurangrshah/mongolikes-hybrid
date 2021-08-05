import nc from "next-connect";
import { getSession } from "next-auth/client";

import middleware from "@/backend/middleware";
import { verify } from "@/backend/middleware/verify";
import { getMe } from "@/backend/controllers";
import { onError, onNoMatch } from "@/backend/utils";

const handler = nc({ onNoMatch, onError })
  .use(verify) // 🔒 session being check with getSSP
  .use(middleware)
  .get(async (req, res) => {
    if (!req?.user) return res.status(401).json({ message: "Unauthorized" });
    const userId = req?.user?.sub;
    const me = await getMe(userId);
    if (me) return res.json(me);
    res.status(500).json({ message: "Error finding user" });
  });

export default handler;

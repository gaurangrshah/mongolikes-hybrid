import nc from "next-connect";
import { getSession } from "next-auth/client";

import middleware from "@/backend/middleware";
import { verify } from "@/backend/middleware/verify";

import { onError } from "@/backend/utils";
import { getMe } from "@/backend/controllers";

const handler = nc({ onError })
  .use(verify) // 🔒 session being check with getSSP
  .use(middleware)
  .get(async (req, res) => {
    if (!req?.user) return res.status(401).json({ message: "Unauthorized" });
    const userId = req?.user?.sub;
    if (userId !== req?.query.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const me = await getMe(userId || req?.query.id);
    if (me) return res.json(me);
    res.status(500).json({ message: "Error finding user" });
  });

export default handler;

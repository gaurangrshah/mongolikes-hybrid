import nc from "next-connect";
import { getSession } from "next-auth/client";

import middleware from "@/backend/middleware";
import { verify } from "@/backend/middleware/verify";

import { onError } from "@/backend/utils";
import { getMe } from "@/backend/controllers";

const handler = nc({ onError })
  // .use(verify) // 🔒 session being check with getSSP
  .use(middleware)
  .get(async (req, res) => {
    // const userId = req.user._id; // @FIXME: hardcoded user id
    const me = await getMe(req.query.id);
    if (me) return res.json(me);
    res.status(500).json({ message: "Error finding user" });
  });

export default handler;

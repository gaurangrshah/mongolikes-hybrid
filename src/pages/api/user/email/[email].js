import nc from "next-connect";

import middleware from "@/backend/middleware";
import { getUserByEmail } from "@/backend/controllers";
import { onError, onNoMatch } from "@/backend/utils";

const handler = nc({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    res.json({ user: await getUserByEmail(req?.query?.email) });
  });

export default handler;

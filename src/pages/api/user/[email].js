import nc from "next-connect";

import middleware from "@/backend/middleware";
import { verify } from "@/backend/middleware/verify";
import { onError } from "@/backend/utils";
import { getUserByEmail } from "@/backend/controllers";

const handler = nc({ onError })
  .use(verify)
  .use(middleware)
  .get(async (req, res, user) => {
    res.json({ user: await getUserByEmail(req?.query?.email) });
  });

export default handler;

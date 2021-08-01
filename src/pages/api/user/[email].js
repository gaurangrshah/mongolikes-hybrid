import nc from "next-connect";
import middleware from "@/backend/middleware";
import { onError } from "@/backend/utils";
import User from "@/backend/models/User";

const handler = nc({ onError })
  .use(middleware)
  .get(async (req, res) => {
    const { email } = req.query;
    const user = await User.findByEmail(email);
    res.json(user);
  });

export default handler;

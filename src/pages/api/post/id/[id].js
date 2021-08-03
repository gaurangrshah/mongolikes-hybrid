import nc from "next-connect";

import middleware from "@/backend/middleware";
import { verify } from "@/backend/middleware/verify";
import { deletePost, getPostById } from "@/backend/controllers";
import { onError } from "@/backend/utils";

const handler = nc({ onError })
  .use(middleware)
  .get(async (req, res) => {
    const post = await getPostById(req.query.id);
    if (post._id) return res.json(post);
    res.status(500).json({ message: "!Error finding post" });
  })
  // .use(verify) // @TODO: lock this down
  .delete(async (req, res, user) => {
    // @TODO: uncomment when middleware is active
    // if (!user) return res.status(401).json({ message: "Unauthorized" });

    // @FIXME: hardcoded user id
    const post = await deletePost(req.query.id, "6106e125fda8ab8379b833d6");
    if (post) return res.status(202).json(post);
    res.status(500).json({ message: "!Error deleting post" });
  });

export default handler;

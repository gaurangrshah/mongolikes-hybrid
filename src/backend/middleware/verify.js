import jwt from "next-auth/jwt";
// @NOTE: cannot seem to access session on the server - works with getssp but not here
import { getSession } from "next-auth/client";
export const verify = async (req, res, next) => {
  try {
    // console.log("verifying session");
    // const payload = await jwt.getToken({ req, secret: process.env.SECRET });
    // console.log("🚀 | file: verify.js | line 7 | payload", payload);
    // if (payload) {
    //   console.log("token verified", payload.sub);
    //   req.user = payload;
    //   next();
    // } else throw new Error("must be authenticated");
    // console.log(req.cookie);
    // const session = await getSession({ req });
    // console.log("🚀 | file: verify.js | line 14 | session", session);
    // if (session) {
    //   console.log("session verified", session.user._id);
    //   req.user = session.user;
    //   next();
    // } else throw new Error("must be authenticated");
  } catch (err) {
    console.log("token not found");
    next(err);
  }
};

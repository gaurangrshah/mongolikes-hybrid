import jwt from "next-auth/jwt";

export const verify = async (req, res, next) => {
  try {
    console.log("verifying token");
    const payload = await jwt.getToken({ req, secret: process.env.SECRET });
    if (payload) {
      console.log("token verified", payload.sub);
      req.user = payload;
      next();
    } else throw new Error("must be authenticated");
  } catch (err) {
    console.log("token not found");
    next(err);
  }
};

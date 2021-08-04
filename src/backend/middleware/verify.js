import jwt from "next-auth/jwt";

export const verify = async (req, res, next) => {
  // @NOTE: NOT IMPLEMENTED ON ALL ROUTES,
  // CANNOT GET SESSSION WHEN CALLING API ROUTES FROM GETSERVERSIDEPROPS
  // DIRECTLY ACCESSING WORKINGS BY NAVIGATING IN BROWSER TO AUTHORIZED ENDPOINT
  // BUT CANNOT SEEM TO GET THE SAME RESULT FROM GETSERVERSIDEPROPS

  // @NOTE: see pages/post/create for working example - from clientside

  try {
    console.log("--- verifying session");
    const payload = await jwt.getToken({ req, secret: process.env.SECRET });
    if (payload) {
      console.log("--- token verified");
      req.user = payload;
      next();
    } else throw new Error("!Error must be authenticated");
  } catch (err) {
    console.log("--- token not found");
    next(err);
  }
};

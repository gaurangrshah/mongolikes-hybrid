import nextConnect from "next-connect";
import morgan from "morgan";

import db from "./db";

const middleware = nextConnect();

middleware.use(morgan("tiny"));
middleware.use(db);

export default middleware;

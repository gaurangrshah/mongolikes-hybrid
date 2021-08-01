import User from "../models/User";
import { errors } from "../utils";

export async function getUserByEmail(email) {
  try {
    return await User.findByEmail(email);
  } catch (err) {
    console.error(errors?.notfound?.message);
  }
}

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User, { UserSchema } from "@/backend/models/User";
import Post, { PostSchema } from "@/backend/models/Post";
import Adapters from "next-auth/adapters";

export default NextAuth({
  providers: [
    Providers.Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM, // The "from" address that you want to use
    }),
  ],
  adapter: Adapters.TypeORM.Adapter(process.env.MONGO_DB_URI, {
    customModels: {
      User: { model: User, schema: UserSchema },
      Post: { model: Post, schema: PostSchema },
    },
  }),

  secret: process.env.SECRET,

  session: { jwt: true },

  jwt: {},

  pages: {},

  callbacks: {
    async session(session, user) {
      // add user id to to the session
      session.user._id = user.sub;
      return Promise.resolve(session);
    },
  },

  events: {},

  theme: "light",

  debug: false,
});

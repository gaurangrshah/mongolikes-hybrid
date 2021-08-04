export const details = {
  title: "MongoLikes",
  description: "What do you like?",
  siteUrl: process.env.NEXT_PUBLIC_URL,
};
export const routes = {
  feed: "/",
  api: {
    feed: "/posts",
  },
};
export const options = {
  toasts: { show: true },
};
export const envs = {
  isSSR: typeof window === "undefined",
  isDev: process.env.NODE_ENV === "development",
};

const appConfig = {
  details: {
    title: "MongoLikes",
    description: "What do you like?",
    siteUrl: process.env.NEXT_PUBLIC_URL,
  },
  routes: {
    feed: "/",
    api: {
      feed: "/posts",
    },
  },
  options: {
    toasts: { show: true },
    swr: {
      refreshInterval: process.env.NODE_ENV === "development" ? 20000 : 1000,
    },
  },
  envs: {
    isSSR: typeof window === "undefined",
    isDev: process.env.NODE_ENV === "development",
  },
};

export default appConfig;

import { ToastProvider } from "./chakra/contexts/toast-context";
import { ModalProvider } from "./chakra/contexts/modal-context";

const appConfig = {
  details: {
    title: "MongoLikes",
    description: "What do you like?",
    siteUrl: process.env.NEXT_PUBLIC_URL,
  },
  routes: {
    feed: "/",
    api: {
      endpoints: {
        // include endpoints exposed via client side api routes
      },
    },
  },
  options: { toasts: { show: true } },
  providers: [ModalProvider, ToastProvider],
  envs: {
    isSSR: typeof window === "undefined",
    isDev: process.env.NODE_ENV === "development",
  },
};

export default appConfig;

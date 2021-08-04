import { Provider as AuthProvider } from "next-auth/client";
import { ChakraProvider } from "@chakra-ui/react";

import { DefaultLayout, ModalProvider, theme, ToastProvider } from "@/chakra";
import { MessageRouter } from "@/components/next";

import { envs } from "@/app-config";
import useSWR, { SWRConfig } from "swr";
import { jsonFetcher } from "@/utils";

export default function App({ Component, pageProps, router }) {
  const { data: posts } = useSWR("/api/posts");

  if (!envs?.isSSR) console.log(theme);

  return (
    <ChakraProvider theme={theme} resetCSS>
      <AuthProvider
        options={{
          clientMaxAge: 0,
          keepAlive: 0,
        }}
        session={pageProps.session}
      >
        <ModalProvider>
          <ToastProvider>
            <MessageRouter asPath={router.asPath}>
              <DefaultLayout>
                <SWRConfig
                  value={{
                    refreshInterval: process.env.NEXT_PUBLIC_REFRESH_INTERVAL,
                    fetcher: jsonFetcher,
                  }}
                >
                  <Component {...pageProps} />
                </SWRConfig>
              </DefaultLayout>
            </MessageRouter>
          </ToastProvider>
        </ModalProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

import { Provider as AuthProvider } from "next-auth/client";
import { ChakraProvider } from "@chakra-ui/react";

import { DefaultLayout, ModalProvider, theme, ToastProvider } from "@/chakra";
import { MessageRouter } from "@/components/next";

import { options, envs } from "@/app-config";
import useSWR, { SWRConfig } from "swr";

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
                    refreshInterval: options?.swr?.refreshInterval,
                    fetcher: (resource, init) =>
                      fetch(resource, init).then((res) => res.json()),
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

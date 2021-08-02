import { Provider as AuthProvider } from "next-auth/client";
import { ChakraProvider } from "@chakra-ui/react";

import { DefaultLayout, theme } from "@/chakra";
import { MessageRouter } from "@/components/next";

import appConfig from "@/app-config";
import { combineProviders } from "@/utils";
// import "./styles.css";

export default function App({ Component, pageProps, router }) {
  const Providers = combineProviders(appConfig?.providers);
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Providers>
        <AuthProvider
          options={{
            clientMaxAge: 0,
            keepAlive: 0,
          }}
          session={pageProps.session}
        >
          <MessageRouter asPath={router.asPath}>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </MessageRouter>
        </AuthProvider>
      </Providers>
    </ChakraProvider>
  );
}

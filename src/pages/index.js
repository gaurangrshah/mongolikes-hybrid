import { useEffect } from "react";
import useSWR from "swr";
import { Spinner } from "@chakra-ui/react";

import { Page } from "@/components/next/Page";

import { useToastDispatch } from "@/chakra/contexts/toast-context";
import { jsonFetcher } from "@/utils";
import { options } from "@/app-config";

export default function LandingPage({ initialData }) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`,
    jsonFetcher,
    {
      initialData,
      refreshInterval: options?.swr?.refreshInterval,
    }
  );

  const { setMsg } = useToastDispatch();

  if (!data) return <Spinner />;

  useEffect(
    () =>
      error &&
      setMsg(
        { description: error?.message || "Sorry there seems to be an error" },
        "error"
      ),
    [error]
  );

  return (
    <>
      <Page title='Test Render' />
      {data && <div>{JSON.stringify(data, null, 2)}</div>}
      {error && (
        <div>
          If there is an error please try refreshing the page. Thank you.
        </div>
      )}
    </>
  );
}

export async function getStaticProps(ctx) {
  const { jsonFetcher } = await import("../utils/swr/json-fetcher");

  const response = await jsonFetcher(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`
  );
  if (response) return { props: { initialData: response || "What is this" } };
}

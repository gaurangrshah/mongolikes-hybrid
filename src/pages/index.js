import { useEffect } from "react";
import useSWR from "swr";
import { Spinner } from "@chakra-ui/react";

import Page from "@/components/next/Page";

import { useToastDispatch } from "@/chakra/contexts/toast-context";
import { jsonFetcher } from "@/utils";

export default function LandingPage({ initialData }) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLI_SITE_URL}/api/data`,
    jsonFetcher,
    {
      initialData,
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

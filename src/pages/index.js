import { useEffect } from "react";
import useSWR from "swr";
import { Spinner } from "@chakra-ui/react";

import { Page } from "@/components/next/Page";
import { PostList } from "@/components/posts";

import { useToastDispatch } from "@/chakra/contexts/toast-context";
import { jsonFetcher } from "@/utils";

const ENDPOINT = `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`;

export default function LandingPage({ initialData }) {
  const { setMsg } = useToastDispatch();
  const { data, error } = useSWR(ENDPOINT, jsonFetcher, {
    initialData,
  });

  if (!data) return <Spinner />;

  useEffect(() => {
    if (!error || data) return;
    setMsg(
      {
        description:
          "Sorry there seems to be an error, please try refreshing the page",
      },
      "error"
    );
    console.error(error?.message);
  }, [error]);

  return (
    <>
      <Page title='Test Render' />
      {data && <PostList posts={data} />}
      {error && (
        <div>
          If there is an error please try refreshing the page. Thank you.
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { jsonFetcher } = await import("../utils/swr/json-fetcher");

  const response = await jsonFetcher(ENDPOINT);
  if (response) return { props: { initialData: response || "What is this" } };
}

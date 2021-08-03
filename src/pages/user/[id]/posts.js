import { useEffect } from "react";
import useSWR from "swr";
import { Spinner } from "@chakra-ui/react";

import { Page } from "@/components/next/Page";
import { PostList } from "@/components/posts";

import { useToastDispatch } from "@/chakra/contexts/toast-context";
import { jsonFetcher } from "@/utils";
import { options } from "@/app-config";

export default function Posts({ initialData, userId }) {
  const { setMsg } = useToastDispatch();
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/id/${userId}`,
    jsonFetcher,
    {
      initialData,
      refreshInterval: options?.swr?.refreshInterval,
    }
  );

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
      {data && <div>{JSON.stringify({ data })}</div>}
      {error && (
        <div>
          If there is an error please try refreshing the page. Thank you.
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { jsonFetcher } = await import("../../../utils/swr/json-fetcher");
  const data = await jsonFetcher(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/id/${ctx.params.id}`
  );
  if (!data)
    return {
      notFound: true,
    };

  return {
    props: {
      initialData: data,
      userId: ctx.params.id,
    },
  };
}

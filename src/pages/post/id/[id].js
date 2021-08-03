import { useEffect } from "react";
import useSWR from "swr";
import { Spinner } from "@chakra-ui/react";

import { Page } from "@/components/next/Page";
import { Post } from "@/components/posts";

import { useToastDispatch } from "@/chakra/contexts/toast-context";
import { jsonFetcher } from "@/utils";
import { options } from "@/app-config";

export default function PostId({ initialData, slug }) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/post/slug/${slug}`,
    jsonFetcher,
    {
      initialData,
      refreshInterval: options?.swr?.refreshInterval,
    }
  );

  const { setMsg } = useToastDispatch();
  useEffect(() => {
    error &&
      setMsg(
        { description: error?.message || "Sorry there seems to be an error" },
        "error"
      );
  }, [error]);
  if (!error && !data) return <Spinner />;

  return (
    <>
      <Page title='Test Render' />
      {data && <Post data={data} />}

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
  const response = await jsonFetcher(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/post/id/${ctx?.query?.id}`
  );

  return {
    props: {
      initialData: response,
      slug: ctx.query.id,
    },
  };
}

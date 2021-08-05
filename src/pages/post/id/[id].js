import { Spinner } from "@chakra-ui/react";

import { Page } from "@/components/next/Page";
import { Post } from "@/components/posts";
import { useSWRPost } from "@/hooks/use-swr-post";

const ENDPOINT = `${process.env.NEXT_PUBLIC_SITE_URL}/api/post/id`;
export default function PostId({ initialData, postId }) {
  const { data, error, handlePublish } = useSWRPost(`${ENDPOINT}/${postId}`, {
    initialData,
  });

  if (!error && !data) return <Spinner />;

  return (
    <>
      <Page title='Test Render' />
      {data && <Post post={data} handlePublish={handlePublish} />}

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
  const response = await jsonFetcher(`${ENDPOINT}/${ctx?.query?.id}`);

  return {
    props: {
      initialData: response,
      postId: ctx.query.id,
    },
  };
}

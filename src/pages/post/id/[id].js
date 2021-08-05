import { Spinner } from "@chakra-ui/react";

import { Page } from "@/components/next/Page";
import { Post } from "@/components/posts";
import { useSWRPost, useLikes } from "@/hooks/use-swr-post";
import { update3 } from "@/utils/swr";

const ENDPOINT = `${process.env.NEXT_PUBLIC_SITE_URL}/api/post/id`;
export default function PostId({ initialData, postId }) {
  const { data, error, mutate, handlePublish } = useSWRPost(
    `${ENDPOINT}/${postId}`,
    { initialData }
  );

  // @TODO: rename
  const updater = (updatedPost, user, type) => {
    return update3(updatedPost, user, type);
  };

  const { handleLike } = useLikes(updater, mutate);

  if (!error && !data) return <Spinner />;

  return (
    <>
      <Page title='TESTING DASH' />
      {data && (
        <Post
          post={data}
          handlePublish={handlePublish}
          handleLike={handleLike}
        />
      )}

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

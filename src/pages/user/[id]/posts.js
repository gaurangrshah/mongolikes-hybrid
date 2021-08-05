import { Spinner } from "@chakra-ui/react";

import { Page } from "@/components/next/Page";
import { PostList, PostCard } from "@/components/posts";

import { useSWRPost } from "@/hooks/use-swr-post";

const ENDPOINT = `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/id`;

export default function Posts({ initialData, userId }) {
  const { data, error } = useSWRPost(`${ENDPOINT}/${userId}`, {
    initialData,
  });

  if (!error && !data) return <Spinner />;

  function renderPublicArticles(post) {
    console.log(post._id);
    return <PostCard key={post._id} post={post} />;
  }

  return (
    <>
      <Page title={`${data?.name}'s Posts` || `MongoLikes user:${data._id}`} />
      {data && <PostList posts={data?.posts} render={renderPublicArticles} />}
      {error && (
        <div>
          If there is an error please try refreshing the page. Thank you.
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { jsonFetcher } = await import("@/utils/swr/json-fetcher");
  const data = await jsonFetcher(`${ENDPOINT}/${ctx.params.id}`);
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

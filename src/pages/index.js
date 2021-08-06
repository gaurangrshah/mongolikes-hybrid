import { Spinner } from "@chakra-ui/react";

import { Page } from "@/components/next/Page";
import { PostList, PostCard } from "@/components/posts";

import { useSWRPost } from "@/hooks/use-swr-post";

const ENDPOINT = `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`;

export default function LandingPage({ initialData }) {
  const { data, error } = useSWRPost(ENDPOINT, {
    initialData,
  });

  if (!data) return <Spinner />;

  function renderPosts(post) {
    if (!post) return;
    return <PostCard key={post._id} post={post} />;
  }

  return (
    <>
      <Page
        title={
          `${data?.username || data?.email.split("@")[0]}'s Posts` ||
          `MongoLikes user:${data._id}`
        }
      />
      {data && <PostList posts={data} render={renderPosts} />}
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

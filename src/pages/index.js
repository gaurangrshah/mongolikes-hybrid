import { useEffect } from "react";
import useSWR from "swr";
import { Spinner } from "@chakra-ui/react";

import { Page } from "@/components/next/Page";
import { PostList, PostCard } from "@/components/posts";

import { useSWRPost, useLikes } from "@/hooks/use-swr-post";
import { useToastDispatch } from "@/chakra/contexts/toast-context";
import { update1 } from "@/utils/swr";

const ENDPOINT = `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`;

export default function LandingPage({ initialData }) {
  const { setMsg } = useToastDispatch();
  const { data, error, mutate } = useSWRPost(ENDPOINT, {
    initialData,
  });

  const updater = (updatedPost, user, type) => {
    // @TODO: rename
    return update1(data, updatedPost, user, type);
  };
  const { handleLike } = useLikes(updater, mutate);

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

  function renderPosts(post) {
    if (!post) return;
    return <PostCard key={post._id} post={post} handleLike={handleLike} />;
  }

  return (
    <>
      <Page title='Test Render' />
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

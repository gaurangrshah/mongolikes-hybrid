import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { Spinner } from "@chakra-ui/react";
import { useDebouncedCallback } from "use-debounce";

import { Page } from "@/components/next/Page";
import { Post } from "@/components/posts";
import { useToastDispatch } from "@/chakra/contexts/toast-context";

const messages = {
  notmodified: "This post is already published.",
  noop: "Could not complete this reqeust, please try again.",
  success: "Your post has been published",
};

export default function PostId({ initialData, postId }) {
  const ENDPOINT = `${process.env.NEXT_PUBLIC_SITE_URL}/api/post/id/${postId}`;
  const { data, error, handlePublish } = useSWRPost(ENDPOINT, { initialData });

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

export function useSWRPost(...args) {
  const { data, error, mutate } = useSWR(...args);
  const { setMsg } = useToastDispatch();

  const published = data?.published;

  // handle errors from the API
  useEffect(() => {
    error && console.log(error);
  }, [error]);
  if (!error && !data) return <Spinner />;

  const handlePublish = async () => {
    console.log("🚀 | file: [id].js | line 50 | published", published);
    if (published) {
      return setMsg({ description: messages.notmodified }, "info");
    }
    const response = await fetch(`/api/post/publish/${data._id}`, {
      method: "POST",
    });

    if (response.status < 300) {
      mutate((existingData) => {
        return {
          ...existingData,
          published: Date.now(),
        };
      });
      return setMsg({ description: messages.success }, "success");
    } else if (response.status === 304) {
      return setMsg({ description: messages.notmodified }, "error");
    } else {
      return setMsg({ description: response?.error || messages.noop }, "error");
    }
  };

  return {
    data,
    error,
    mutate,
    handlePublish,
  };
}

export async function getServerSideProps(ctx) {
  const { jsonFetcher } = await import("../../../utils/swr/json-fetcher");
  const response = await jsonFetcher(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/post/id/${ctx?.query?.id}`
  );

  return {
    props: {
      initialData: response,
      postId: ctx.query.id,
    },
  };
}

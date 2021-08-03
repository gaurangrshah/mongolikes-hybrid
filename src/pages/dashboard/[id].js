import { useEffect } from "react";
import useSWR from "swr";
import {
  Avatar,
  Box,
  Heading,
  IconButton,
  Spinner,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { Page } from "@/components/next/Page";
import { PostList, PostManagerCard } from "@/components/posts";

import { useToastDispatch } from "@/chakra/contexts/toast-context";
import { jsonFetcher } from "@/utils";
import { options } from "@/app-config";

export default function Me({ initialData, userId }) {
  const { setMsg } = useToastDispatch();
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/me/${userId}`,
    jsonFetcher,
    {
      initialData,
      refreshInterval: options?.swr?.refreshInterval,
    }
  );

  if (!data) return <Spinner />;

  useEffect(() => {
    if (!error) return;
    setMsg(
      {
        description:
          "Sorry there seems to be an error, please try refreshing the page",
      },
      "error"
    );
    console.error(error?.message);
  }, [error]);

  function renderManagedArticles(post) {
    return <PostManagerCard key={post._id} post={post} />;
  }

  return (
    <>
      <Page title={`MongoLikes Dashboard`} />

      {data?.length && !error ? (
        <PostList posts={data?.posts} render={renderManagedArticles} />
      ) : (
        "Sorry, you don't seem to have any posts yet, get started!"
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

  // @HACK: check auth here, next-auth session is not avaialble when making the fetch request.
  const { getSession } = await import("next-auth/client");
  const session = await getSession(ctx);
  const isOwner = ctx.query.id === session.user._id;
  if (isOwner) {
    const { jsonFetcher } = await import("@/utils");
    const data = await jsonFetcher(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/me/${ctx.query.id}`
    );
    if (!data)
      return {
        notFound: true,
      };

    return {
      props: {
        initialData: data,
      },
    };
  } else {
    const errorMessage = "You don't have permission to access this page";
    return {
      redirect: {
        destination: `/user/${ctx.query.id}/posts/?${errorMessage}`,
        permanenet: false,
      },
      props: {},
    };
  }
}

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

  useEffect(
    () =>
      error &&
      setMsg(
        { description: error?.message || "Sorry there seems to be an error" },
        "error"
      ),
    [error]
  );

  function renderManagedArticles(post) {
    return <PostManagerCard post={post} />;
  }

  return (
    <>
      <Page title='Test Render' />
      {data && <PostList posts={data?.posts} render={renderManagedArticles} />}
      {error && (
        <div>
          If there is an error please try refreshing the page. Thank you.
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { getSession } = await import("next-auth/client");
  const session = await getSession(ctx);
  console.log("🚀 | file: [id].js | line 51 | session", session);
  const isOwner = ctx.query.id === session.user._id;
  console.log("🚀 | file: [id].js | line 53 | isOwner", isOwner);
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
    return {
      redirect: {
        destination: `/user/${ctx.query.id}/posts/?error=must be authenticated`,
        permanenet: false,
      },
      props: {},
    };
  }
}

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
import { PostList, PostCard } from "@/components/posts";

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

  function renderPublicArticles(post) {
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

export function AddButton({ onClick }) {
  return (
    <Tooltip label='Create New Article' fontSize='sm' bg='gray.300'>
      <IconButton
        position='fixed'
        top={24}
        right={6}
        icon={<AddIcon />}
        colorScheme='green'
        onClick={onClick}
      />
    </Tooltip>
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

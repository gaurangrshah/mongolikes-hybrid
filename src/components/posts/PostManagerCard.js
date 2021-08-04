import { useCallback } from "react";
import { useRouter } from "next/router";
import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { Image } from "@/components/next/NextImage";
import { ChNextLink } from "@/components/next/NextLink";
import { PostMeta } from "./PostMeta";

import { ActionConfirmButton } from "@/chakra/components";
import { useToastDispatch } from "@/chakra/contexts/toast-context";

export function PostManagerCard({ post }) {
  const router = useRouter();
  const { setMsg } = useToastDispatch();

  const handleDelete = async () => {
    //@TODO: replace with swr
    return fetch(`/api/post/id/${post._id}`, {
      method: "DELETE",
    });
  };

  const handleResponse = useCallback(
    (response) => {
      if (response?.status < 300) {
        setMsg(
          {
            description: "Post deleted",
          },
          "success"
        );
      } else {
        setMsg(
          {
            description: "Could not complete operation",
          },
          "error"
        );
      }
    },
    [router, setMsg]
  );

  return (
    <>
      <VStack
        as='article'
        position='relative'
        p={4}
        minH={36}
        w='1/2'
        maxW='container.sm'
        mx='auto'
        mb={8}
        spacing={6}
        boxShadow='xl'
        rounded='md'
      >
        <ChNextLink href={`/post/id/${post?._id}`}>
          {post?.image && (
            <Image src={post?.image} width='480' height='360' rounded='lg' />
          )}
          <Heading
            as='h3'
            fontSize='3xl'
            _hover={{ textDecor: "underline", color: "gray.400" }}
          >
            {post?.title}
          </Heading>
        </ChNextLink>
        <Text px={3} flex={1} fontSize='sm' noOfLines={3}>
          {post?.body}
        </Text>
        <HStack as='footer' w='full' mt={-1} justify='space-between' flex={0}>
          <PostMeta
            author={post?.author}
            published={new Date(post.published).toDateString()}
            postId={post?._id}
          />
          <ActionConfirmButton
            action={handleDelete}
            cb={handleResponse}
            icon={<DeleteIcon />}
            btnLabel='Delete'
          />
        </HStack>
      </VStack>
    </>
  );
}

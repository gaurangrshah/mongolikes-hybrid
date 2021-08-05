import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { Image } from "@/components/next/NextImage";
import { ChNextLink } from "@/components/next/NextLink";
import { PostMeta } from "./PostMeta";

import { ActionConfirmButton } from "@/chakra/components";

export function PostManagerCard({ post, handlePublish, handleDelete }) {
  const updatePublishedStatus = () => {
    handlePublish(post);
  };

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
          <PostMeta post={post} handlePublish={updatePublishedStatus} isAdmin />
          <ActionConfirmButton
            action={handleDelete}
            icon={<DeleteIcon />}
            btnLabel='Delete'
          />
        </HStack>
      </VStack>
    </>
  );
}

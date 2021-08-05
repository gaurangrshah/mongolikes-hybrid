import { Heading, Text, VStack } from "@chakra-ui/react";

import { Image } from "@/components/next";
import { PostMeta } from "./PostMeta";

export function Post({ post, handlePublish }) {
  return (
    <VStack
      as='article'
      position='relative'
      p={12}
      minH={36}
      w='1/2'
      maxW='container.sm'
      mx='auto'
      mt={16}
      mb={8}
      spacing={6}
      boxShadow='xl'
      rounded='md'
      color='gray.800'
    >
      <Heading
        as='h1'
        fontSize='4xl'
        mb={6}
        _hover={{ textDecor: "underline", color: "gray.400" }}
      >
        {post?.title}
      </Heading>
      {post?.image && (
        <Image src={post?.image} width='640' height='480' rounded='lg' />
      )}
      <Text px={3} flex={1} fontSize='md'>
        {post?.body}
      </Text>
      <PostMeta post={post} handlePublish={handlePublish} />
    </VStack>
  );
}

import { Box, Heading, Text, VStack } from "@chakra-ui/react";

import { Image, ChNextLink } from "@/components/next";
import { PostMeta } from "./PostMeta";

export function PostCard({ post, handleLike }) {
  return (
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
      <ChNextLink href={`/post/id/${post._id}`}>
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
      <Box flex={1}>
        <Text fontSize='sm' noOfLines={3}>
          {post?.body}
        </Text>
      </Box>
      <PostMeta post={post} handleLike={handleLike} />
    </VStack>
  );
}

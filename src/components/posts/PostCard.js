import { Box, Heading, Text, VStack } from "@chakra-ui/react";

import { Image, ChNextLink } from "@/components/next";
import { PostFooter } from "./PostFooter";

export function PostCard({ post }) {
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
          <Image
            src={post?.image}
            width='480'
            height='360'
            rounded='lg'
            loading='lazy'
          />
        )}
        <Heading
          as='h3'
          fontSize='3xl'
          _hover={{ textDecor: "underline", color: "gray.400" }}
        >
          {post?.title}
        </Heading>
      </ChNextLink>
      <Box flex={1} w='full'>
        <Text fontSize='sm' textAlign='left' noOfLines={3}>
          {post?.body}
        </Text>
      </Box>
      <PostFooter post={post} />
    </VStack>
  );
}

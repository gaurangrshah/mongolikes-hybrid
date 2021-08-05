import { Box, Heading, Text, VStack } from "@chakra-ui/react";

import { Image } from "@/components/next";
import { PostFooter } from "./PostFooter";

export function Post({ post, handlePublish, isAdmin = false }) {
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
        <Image
          src={post?.image}
          width='640'
          height='480'
          rounded='lg'
          loading='lazy'
        />
      )}
      <Box flex={1} w='full'>
        <Text px={3} flex={1} fontSize='md' textAlign='left'>
          {post?.body}
        </Text>
      </Box>
      <PostFooter post={post} handlePublish={handlePublish} isAdmin={isAdmin} />
    </VStack>
  );
}

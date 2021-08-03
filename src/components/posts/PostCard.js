import { Heading, HStack, Text, VStack } from "@chakra-ui/react";

import { Image, ChNextLink } from "@/components/next";
import { PostMeta } from "./PostMeta";
// import { LikeButton } from "./LikeButton";

export function PostCard({ post }) {
  console.log("🚀 | file: PostCard.js | line 8 | post", post);
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
      <ChNextLink
        // @HACK: opt for absolute URL to maintain different route context btw public/private profiles
        // href={`${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug}`}
        href={`#`} // @FIXME:
      >
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
          postId={post._id}
        />
        {/* @TODO: ADD LIKE BUTTON */}
      </HStack>
    </VStack>
  );
}

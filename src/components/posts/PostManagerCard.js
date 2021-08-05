import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { Image } from "@/components/next/NextImage";
import { ChNextLink } from "@/components/next/NextLink";
import { PostFooter } from "./PostFooter";

import { ActionConfirmButton } from "@/chakra/components";

export function PostManagerCard({ post, handlePublish, handleDelete }) {
  const updatePublishedStatus = () => handlePublish(post);

  const handleDeletePost = () => handleDelete(post);

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
          <Text px={3} flex={1} fontSize='sm' textAlign='left' noOfLines={3}>
            {post?.body}
          </Text>
        </Box>
        <HStack as='footer' w='full' mt={-1} justify='space-between' flex={0}>
          <PostFooter
            post={post}
            handlePublish={updatePublishedStatus}
            isAdmin
          />
          <ActionConfirmButton
            action={handleDeletePost}
            icon={<DeleteIcon />}
            btnLabel='Delete'
          />
        </HStack>
      </VStack>
    </>
  );
}

import { Heading, HStack, Spinner, Text, VStack } from "@chakra-ui/react";

import { Image } from "@/components/next";

import { PostMeta } from "./PostMeta";

export function Post({ data }) {

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
        {data?.title}
      </Heading>
      {data?.image && (
        <Image src={data?.image} width='640' height='480' rounded='lg' />
      )}
      <Text px={3} flex={1} fontSize='md'>
        {data?.body}
      </Text>
      <HStack as='footer' w='full' mt={-1} justify='space-between' flex={0}>
        <PostMeta author={data?.author} published={data?.published} />
        {/* @TODO: ADD LIKE BUTTON */}
      </HStack>
    </VStack>
  );
}

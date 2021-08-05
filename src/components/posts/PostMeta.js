import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";

import { ChNextLink } from "@/components/next/NextLink";
import { uiIcons, PathIcon } from "@/components/icons";
import { ActionConfirmButton } from "@/chakra/components";

export function PostMeta({ post, handlePublish }) {
  const isPublished =
    post?.published && post?.published !== "Invalid Date" ? true : false;

  const dateToDateString = (date) => {
    if (!isPublished) return;
    const publishedDate = new Date(date);
    return publishedDate.toLocaleDateString();
  };

  return (
    <>
      <HStack as='footer' w='full' mt={-1} justify='space-between' flex={0}>
        <HStack>
          <ChNextLink href={`/user/${post?.author?._id}/posts`}>
            <Avatar
              name={post?.author?.username || post?.author?.email}
              src={post?.author?.image}
              size='md'
              _hover={{ cursor: "pointer" }}
            />
          </ChNextLink>

          <VStack alignItems='flex-start' spacing={0}>
            <Text as='small'>{post?.author?.name}</Text>
            <HStack py={1} justify='flex-end'>
              {isPublished ? (
                <>
                  <PathIcon icon={uiIcons.calendar} fill='gray.500' />
                  <Box dateTime={post?.published} as='time' fontSize='xs'>
                    {dateToDateString(post?.published)}
                  </Box>
                </>
              ) : (
                <>
                  <ActionConfirmButton
                    action={handlePublish}
                    btnLabel='Unpublished'
                    icon={<PathIcon icon={uiIcons.calendar} fill='gray.500' />}
                  />
                  <Text
                    as='span'
                    role='img'
                    mx={2}
                    aria-label='published status'
                  >
                    {isPublished ? "🔵" : "🔴"}
                  </Text>
                </>
              )}
            </HStack>
          </VStack>
        </HStack>
      </HStack>
    </>
  );
}

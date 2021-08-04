import { useCallback } from "react";
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";

import { ChNextLink } from "@/components/next/NextLink";
import { uiIcons, PathIcon } from "@/components/icons";
import { ActionConfirmButton } from "@/chakra/components";

import { useToastDispatch } from "@/chakra/contexts";

export function PostMeta({ author, published, postId }) {
  const { setMsg } = useToastDispatch();
  const isPostPublished = published !== "Invalid Date";

  async function handlePublish() {
    //@TODO: replace with swr
    return fetch(`/api/posts/publish/${postId}`, { method: "POST" });
  }

  const handleResponse = useCallback(
    (response) => {
      if (response?.status === 200) {
        setMsg(
          {
            description: response?.message || "Post has been published.",
          },
          "error"
        );
      } else {
        setMsg(
          {
            description:
              response?.error ||
              "Could not complete operation, please try again.",
          },
          "error"
        );
      }
    },
    [setMsg]
  );

  return (
    <ChNextLink href={`/user/id/${author?._id}`}>
      <HStack>
        {author?.image && (
          <Avatar
            src={author?.image}
            size='md'
            _hover={{ cursor: "pointer" }}
          />
        )}
        <VStack alignItems='flex-start' spacing={0}>
          <Text as='small'>{author?.name}</Text>
          <HStack py={1} justify='flex-end'>
            {isPostPublished ? (
              <>
                <PathIcon icon={uiIcons.calendar} fill='gray.500' />
                <Box
                  dateTime={new Date(published).toDateString()}
                  as='time'
                  fontSize='xs'
                >
                  {published}
                </Box>
              </>
            ) : (
              <ActionConfirmButton
                action={handlePublish}
                btnLabel='Unpublished'
                icon={<PathIcon icon={uiIcons.calendar} fill='gray.500' />}
                cb={handleResponse}
              />
            )}
          </HStack>
        </VStack>
      </HStack>
    </ChNextLink>
  );
}

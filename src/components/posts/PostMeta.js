import { useCallback, useState } from "react";
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";

import { ChNextLink } from "@/components/next/NextLink";
import { uiIcons, PathIcon } from "@/components/icons";
import { ActionConfirmButton } from "@/chakra/components";

import { useToastDispatch } from "@/chakra/contexts";
import { useSession } from "next-auth/client";

const messages = {
  notmodified: "This post is already published.",
  noop: "Could not complete this reqeust, please try again.",
  success: "Your post has been published",
};

export function PostMeta({ author, published, postId }) {
  const [session] = useSession();
  const { setMsg } = useToastDispatch();
  const [publishedDate, setPublishedDate] = useState(() =>
    published !== "Invalid Date" ? published : null
  );

  async function handlePublish() {
    if (publishedDate) {
      setMsg({ description: messages.notmodified }, "error");
      return;
    }
    //@TODO: replace with swr
    return fetch(`/api/post/publish/${postId}`, { method: "POST" });
  }

  const handleResponse = useCallback(
    async (response) => {
      if (response?.status < 300) {
        const data = await response?.json();
        console.log(data);
        setPublishedDate(data?.published);
        setMsg(
          {
            description: response?.message || messages.success,
          },
          "success"
        );
      } else if (response?.status === 304) {
        console.error(response);
        setMsg({ description: messages.notmodified }, "error");
      } else {
        if (response?.error) console.error(response.error);
        setMsg(
          {
            description: messages.noop,
          },
          "error"
        );
      }
    },
    [setMsg]
  );

  const publishedDateString = new Date(publishedDate).toDateString();

  return (
    <>
      <ChNextLink
        chProps={{ as: HStack }}
        href={`/user/id/${author?._id}/posts`}
      >
        <Avatar
          name={session?.user?.email}
          src={author?.image}
          size='md'
          _hover={{ cursor: "pointer" }}
        />
        <VStack alignItems='flex-start' spacing={0}>
          <Text as='small'>{author?.name}</Text>
          <HStack py={1} justify='flex-end'>
            {publishedDate ? (
              <>
                <PathIcon icon={uiIcons.calendar} fill='gray.500' />
                <Box dateTime={publishedDate} as='time' fontSize='xs'>
                  {publishedDateString}
                </Box>
                <Text as='span' role='img' mx={2} aria-label='published status'>
                  {publishedDate ? "🔵" : "🔴"}
                </Text>
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
      </ChNextLink>
    </>
  );
}

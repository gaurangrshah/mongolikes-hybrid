import { useCallback } from "react";
import { useRouter } from "next/router";
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";

import { ChNextLink } from "@/components/next/NextLink";
import { uiIcons, PathIcon } from "@/components/icons";
import { ActionConfirmButton } from "@/chakra/components";

import { ConditionalWrapper } from "@/utils";
import { useToastDispatch } from "@/chakra/contexts";

const isSSR = typeof window === "undefined";

export function PostMeta({ author, published, postId }) {
  !isSSR &&
    console.log("🚀 | file: PostMeta.js | line 13 | published", published);
  const router = useRouter();
  const { setMsg } = useToastDispatch();
  const isPostPublished = published !== "Invalid Date";

  async function handlePublish() {
    //@TODO:
    // return userService.publishPost(postId);
    return;
  }

  const handleResponse = useCallback(
    (response) => {
      if (response?.status === 200) {
        router.push(`${router.asPath}/?success="Post has been published"`);
      } else {
        setMsg(
          {
            description: "Could not complete operation, please try again.",
          },
          "error"
        );
      }
    },
    [router, setMsg]
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
                {/* @FIXME: */}
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
                // @TODO: update handlers
                // action={handlePublish}
                btnLabel='Unpublished'
                icon={<PathIcon icon={uiIcons.calendar} fill='gray.500' />}
                // cb={handleResponse}
              />
            )}
          </HStack>
        </VStack>
      </HStack>
    </ChNextLink>
  );
}

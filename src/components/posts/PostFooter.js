import { HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { PostMeta } from "./PostMeta";
import { LikeButton } from "./LikeButton";

export function PostFooter({ post, handlePublish, isAdmin }) {
  const router = useRouter();
  const isDashboard = router.asPath.includes("/dashboard") || isAdmin;

  return (
    <HStack as='footer' w='full' mt={-1} justify='space-between' flex={0}>
      <PostMeta
        post={post}
        handlePublish={handlePublish} // handlePublishedStatus
      />
      {!isDashboard && <LikeButton post={post} />}
    </HStack>
  );
}

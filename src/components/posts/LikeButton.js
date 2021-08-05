import { useState } from "react";
import { Button, ButtonGroup, IconButton, Spinner } from "@chakra-ui/react";
import { useDebouncedCallback } from "use-debounce";

import { heartIcons, PathIcon } from "../../components/icons";

import { useSession } from "next-auth/client";

export function LikeButton({ post, handleLike }) {
  const [session] = useSession();

  const [likes, setLikes] = useState(post?.likes);
  const [isLiked, setIsLiked] = useState(
    session?.user?._id && post?.likes.includes(session.user._id)
  );

  const userId = session?.user?._id;

  const updateLikes = (newLikesArr) => {
    setLikes(newLikesArr);
    setIsLiked(newLikesArr?.includes(userId));
  };

  const handleLikeUpdate = useDebouncedCallback(() => {
    handleLike(post, updateLikes);
    setLikes(likes);
  }, 300);

  return (
    <>
      <ButtonGroup isAttached variant='outline' onClick={handleLikeUpdate}>
        <IconButton
          icon={
            <PathIcon
              icon={isLiked ? heartIcons.filled : heartIcons.outlined}
            />
          }
        />
        <Button mr={"-px"}>{likes.length}</Button>
      </ButtonGroup>
    </>
  );
}

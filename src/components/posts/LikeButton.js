import { useEffect, useState } from "react";
import { Button, ButtonGroup, IconButton, Spinner } from "@chakra-ui/react";
import { useDebouncedCallback } from "use-debounce";

import { heartIcons, PathIcon } from "../../components/icons";

import { useSession } from "next-auth/client";
import { useToastDispatch } from "../../chakra/contexts/toast-context";

export function LikeButton({ likesArr, postId, handleUpdate }) {
  const [session] = useSession();
  const { setMsg } = useToastDispatch();

  const [likes, setLikes] = useState(() => [...likesArr]);
  const [likesCount, setLikesCount] = useState(() => likesArr?.length);
  const [isLiked, setIsLiked] = useState();
  // @TODO: set initial liked state from api call
  () => session?.user?._id && likesArr.includes(auth.user._id);

  useEffect(() => {
    setLikesCount(likes?.length);
    return () => {
      setLikesCount(likesArr?.length);
    };
  }, [likes, setLikesCount, likesArr]);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session?.user?._id) {
      return setMsg(
        { description: "You must be logged in first!", duration: null },
        "error"
      );
    }

    // @TODO: define handleUpdate in useSWRPost hook
    const response = await handleUpdate();

    if (response?.status < 299) {
      if (isLiked) {
        // remove like
        setLikes((prevState) => [
          ...prevState.filter((like) => like !== session.user._id),
        ]);
        setIsLiked(false);
      } else {
        // add like
        setLikes((prevState) => [...prevState, session.user._id]);
        setIsLiked(true);
      }
    }
  };

  return (
    <>
      <ButtonGroup isAttached variant='outline' onClick={handleLike}>
        <IconButton
          icon={
            <PathIcon
              icon={isLiked ? heartIcons.filled : heartIcons.outlined}
            />
          }
        />
        <Button mr={"-px"}>{likesCount}</Button>
      </ButtonGroup>
    </>
  );
}

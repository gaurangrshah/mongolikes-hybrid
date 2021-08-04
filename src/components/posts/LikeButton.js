import { useEffect, useState } from "react";
import { Button, ButtonGroup, IconButton, Spinner } from "@chakra-ui/react";
import { useDebouncedCallback } from "use-debounce";

import { heartIcons, PathIcon } from "../../components/icons";

// import { useAuth } from "../../contexts/auth-context";
// import ArticlesService from "../../services/articles-service";
import { useToastDispatch } from "../../chakra/contexts/toast-context";

export function LikeButton({ id, likesArr }) {
  // const auth = useAuth(); // @TODO: useSession
  const { setMsg } = useToastDispatch();

  const [likes, setLikes] = useState(() => [...likesArr]);
  const [likesCount, setLikesCount] = useState(() => likesArr?.length);
  const [isLiked, setIsLiked] = useState(
    // @TODO: set initial liked state from api call
    // () => auth?.user?._id && likesArr.includes(auth.user._id)
  );

  const addLike = useDebouncedCallback((userId) => {
    setLikes((prevState) => [...prevState, userId]);
    setIsLiked(true);
  }, 300);
  const removeLike = useDebouncedCallback((userId) => {
    setLikes((prevState) => prevState.filter((like) => like !== userId));
    setIsLiked(false);
  }, 300);

  useEffect(() => {
    setLikesCount(likes?.length);
    return () => {
      setLikesCount(likesArr?.length);
    };
  }, [likes, setLikesCount, likesArr]);

  const handleLikes = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // @TODO: replace with session.user._id
    if (!auth?.user?._id) {
      return setMsg(
        { description: "You must be logged in first!", duration: null },
        "error"
      );
    }
    // @TODO: handle likes logic
    // const { status, message } = await ArticlesService.updateLike(id);
    // if (status < 299) {
    //   isLiked ? removeLike(auth?.user?._id) : addLike(auth?.user?._id);
    // } else {
    //   setMsg({ description: message }, "error");
    // }
  };


  return (
    <ButtonGroup
      isAttached
      variant='outline'
      // @TODO:
      // onClick={(e) => mutation.mutate(e)}
    >
      <IconButton
        icon={
          <PathIcon icon={isLiked ? heartIcons.filled : heartIcons.outlined} />
        }
      />
      <Button mr={"-px"}>{likesCount}</Button>
    </ButtonGroup>
  );
}

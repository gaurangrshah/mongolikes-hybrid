import { useEffect, useState } from "react";
import useSWR from "swr";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { useDebouncedCallback } from "use-debounce";

import { heartIcons, PathIcon } from "@/components/icons";

import { useSession } from "next-auth/client";
import { useToastDispatch } from "@/chakra";
import { useWindowMounted } from "@/hooks/use-window-mounted";

function randomString(min = 2, max = 5) {
  return (
    Math.random().toString(36).substring(min, max) +
    Math.random().toString(36).substring(min, max)
  );
}

export function LikeButton({ post }) {
  const ENDPOINT = `/api/post/like/${post._id}`;
  const mounted = useWindowMounted();
  const { data, error, mutate } = useSWR(ENDPOINT);

  const [session] = useSession();
  const userId = session?.user?._id;

  const { setMsg } = useToastDispatch();

  const [liked, setLiked] = useState(false);
  useEffect(() => data?.length && setLiked(data?.includes(userId)), [data]);

  const handleUpdate = useDebouncedCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      setMsg(
        { description: `Please sign in first! - ${randomString()}` },
        "error"
      );
      return;
    }

    const response = await fetch(ENDPOINT, {
      method: "PUT",
    });

    if (response.status < 300) {
      const updatedData = await response.json();
      if (updatedData) {
        setLiked(updatedData.includes(userId));
        mutate(updatedData);
      }
    } else {
      console.error("error", response);
      setMsg(
        {
          description: `There seems to be an error please try again - ${randomString()}`,
        },
        "error"
      );
      return;
    }
  }, 300);

  return (
    <>
      <ButtonGroup isAttached variant='outline' onClick={handleUpdate}>
        <IconButton
          isLoading={!mounted || (!error && !data)}
          icon={
            <PathIcon
              icon={liked ? heartIcons.filled : heartIcons.outlined}
              transition='all'
            />
          }
        />
        <Button
          mr={"-px"}
          sx={{
            fontVariant: "tabular-nums",
          }}
          isLoading={!mounted || (!error && !data)}
        >
          {data?.length}
        </Button>
      </ButtonGroup>
    </>
  );
}

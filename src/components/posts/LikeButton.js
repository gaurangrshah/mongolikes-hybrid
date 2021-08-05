import { useEffect, useState } from "react";
import useSWR from "swr";
import { Button, ButtonGroup, IconButton, Spinner } from "@chakra-ui/react";
import { useDebouncedCallback } from "use-debounce";

import { heartIcons, PathIcon } from "@/components/icons";

import { useSession } from "next-auth/client";
import { reconcileArrays } from "@/utils";

export function LikeButton({ post }) {
  const ENDPOINT = `/api/post/like/${post._id}`;
  const [session] = useSession();
  const { data, error, mutate } = useSWR(ENDPOINT);
  const [liked, setLiked] = useState(false);

  const userId = session?.user?._id;
  const handleUpdate = useDebouncedCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) return console.error("must be authenticated");

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
    }
  }, 300);

  return (
    <>
      <ButtonGroup isAttached variant='outline' onClick={handleUpdate}>
        <IconButton
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
          isLoading={!error && !data}
        >
          {data?.length}
        </Button>
      </ButtonGroup>
    </>
  );
}

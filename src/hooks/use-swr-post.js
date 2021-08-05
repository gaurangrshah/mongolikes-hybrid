import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { Spinner } from "@chakra-ui/react";
import { useDebouncedCallback } from "use-debounce";
import { useSession } from "next-auth/client";

import { useToastDispatch } from "@/chakra/contexts/toast-context";
import { messages } from "@/utils";

export function useSWRPost(...args) {
  const { data, error, mutate } = useSWR(...args);
  const { setMsg } = useToastDispatch();
  const [session] = useSession();

  const published = data?.published;

  // handle errors from the API
  useEffect(() => {
    if (error) {
      console.error(error);
      setMsg({ description: error?.message || messages.tryagain }, "error");
    }
  }, [error]);

  const handlePublish = async (post) => {
    if (!session?.user?._id) {
      return setMsg({ description: messages.unauthorized }, "error");
    }

    if (published) {
      return setMsg({ description: messages.notmodified }, "info");
    }

    post.published = Date.now();
    const updatedPosts = { ...data.posts, post };

    try {
      const response = await fetch(`/api/post/publish/${post._id}`, {
        method: "POST",
      });
      if (response.status < 300) {
        mutate({ ...data, posts: updatedPosts });
        return setMsg(
          { description: `${messages.success} for ${post._id}` },
          "success"
        );
      } else if (response.status === 304) {
        return setMsg({ description: messages.notmodified }, "error");
      } else {
        return setMsg(
          { description: response?.error || messages.noop },
          "error"
        );
      }
    } catch (err) {
      console.error(err || messages?.unknown);
    }
  };

  const handleCreate = async (formValues) => {
    if (!session?.user?._id) {
      return setMsg({ description: messages.unauthorized }, "error");
    }

    try {
      const response = await fetch(`/api/post/create`, {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify(formValues),
      });

      if (response?.status < 300) {
        const { post } = await response.json();
        mutate(async (existingData) => {
          return {
            ...existingData,
            posts: existingData ? [...existingData?.posts, post] : [post],
          };
        });
        setMsg({ description: messages.postcreated }, "success");
      } else {
        setMsg(
          { description: response?.message || messages.tryagain },
          "error"
        );
      }
    } catch (err) {
      console.error(err || messages.unknown);
    }
  };

  const handleDelete = async (post) => {
    if (!session?.user?._id) {
      return setMsg({ description: messages.unauthorized }, "error");
    }

    try {
      const response = await fetch(`/api/post/id/${post._id}`, {
        method: "DELETE",
      });

      if (response.status < 300) {
        const removedData = await response.json();
        mutate(data.posts.filter((post) => post._id !== removedData._id));
        setMsg({ description: messages.postdeleted }, "success");
      } else {
        setMsg(
          { description: response?.message || messages.tryagain },
          "error"
        );
      }
    } catch (err) {
      console.error(err || messages.unknown);
    }
  };

  return {
    data,
    error,
    mutate,
    handlePublish,
    handleCreate,
    handleDelete,
  };
}

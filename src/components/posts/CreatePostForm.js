import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";
import useSWR, { mutate } from "swr";

import BasicForm from "@/components/forms/BasicForm";

import { useWindowMounted } from "@/hooks/use-window-mounted";
import appConfig from "@/app-config";
import { useToastDispatch } from "@/chakra/contexts/toast-context";
import { jsonFetcher } from "@/utils";
import { options } from "@/app-config";

const ENDPOINT = `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/me`;

export function CreatePostForm({ userId, cb }) {
  const router = useRouter();
  const mounted = useWindowMounted();
  const { setMsg } = useToastDispatch();

  const { data, mutate } = useSWR(`${ENDPOINT}/${userId}`, jsonFetcher, {
    refreshInterval: options?.swr?.refreshInterval,
  });

  const handleCreate = async (formValues) => {
    // mutate cache first
    mutate(`${ENDPOINT}/${userId}`, { ...data, ...formValues }, false);

    // update resource to match mutation
    const response = await fetch(`http://localhost:3000/api/post/create`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(formValues),
    });

    if (response?.status < 300) {
      const data = await response.json();
      console.log("🚀 | file: CreatePostForm.js | line 40 | data", data);
      // mutate to refect and hydrate the client
      mutate(`${ENDPOINT}/${userId}`);
      cb && cb(); // onClose callback will close modal window
      router.push(
        `/dashboard/${userId}/?success=${
          response?.message || "success! post created"
        } 🎉 `
      );
    } else {
      setMsg({ description: response?.message }, "error");
    }
  };

  if (!mounted) return <Spinner />;

  const fields = [
    {
      label: "title",
      type: "text",
      placeholder: "title",
      isRequired: true,
      minLength: 3,
    },
    {
      label: "image",
      type: "text",
      placeholder: "http://www.img.com/path-to-image.",
      isRequired: true,
      minLength: 8,
    },
    {
      label: "body",
      type: "textarea",
      placeholder: "Let's get to writing...",
      isRequired: true,
      minLength: 8,
    },
  ];
  const initialValues = {
    title: appConfig.envs.isDev ? "This is a test Post" : "",
    body: appConfig.envs.isDev ? "12341234" : "",
    image: appConfig.envs.isDev ? "http://placeimg.com/640/480/nature" : "",
  };

  return (
    <BasicForm
      {...{
        fields,
        initialValues,
        onSubmit: (formValues) => handleCreate(formValues),
        btnLabel: "Create",
      }}
    />
  );
}

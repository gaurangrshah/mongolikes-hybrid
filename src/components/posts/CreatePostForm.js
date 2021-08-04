import { Spinner } from "@chakra-ui/react";

import BasicForm from "@/components/forms/BasicForm";

import { useWindowMounted } from "@/hooks/use-window-mounted";
import { envs } from "@/app-config";

export function CreatePostForm({ userId, handleCreate }) {
  const mounted = useWindowMounted();

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
    // @FIXME: remove hardcoded values -- used for testing in developement
    title: envs?.isDev ? "This is a test Post" : "",
    body: envs?.isDev ? "12341234" : "",
    image: envs?.isDev ? "http://placeimg.com/640/480/nature" : "",
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

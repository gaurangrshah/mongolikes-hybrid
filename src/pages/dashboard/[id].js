import { useEffect } from "react";
import useSWR from "swr";
import {
  Heading,
  IconButton,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { Page } from "@/components/next/Page";
import { CreatePostForm, PostList, PostManagerCard } from "@/components/posts";
import { CHModal } from "@/chakra";

import { useToastDispatch } from "@/chakra/contexts/toast-context";
import { jsonFetcher } from "@/utils";

const ENDPOINT = `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/me`;

export default function Me({ initialData, userId }) {
  const { setMsg } = useToastDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, error, mutate } = useSWR(
    [`${ENDPOINT}/${userId}`],
    jsonFetcher,
    {
      initialData,
    }
  );

  useEffect(() => {
    if (!error) return;
    setMsg(
      {
        description:
          "Sorry there seems to be an error, please try refreshing the page",
      },
      "error"
    );
    console.error(error?.message);
  }, [error]);

  if (!data && !error) return <Spinner />;

  const handleCreate = async (formValues) => {
    const response = await fetch(`/api/post/create`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(formValues),
    });

    if (response?.status < 300) {
      const data = await response.json();
      mutate(async (existingData) => {
        return {
          ...existingData,
          posts: [...existingData.posts, formValues],
        };
      });
      onClose();

      setMsg(
        {
          description: "🎉  Success! Post Created! 🎉",
        },
        "success"
      );
    } else {
      const defaultError = "Error saving post please try again";
      setMsg({ description: response?.message || defaultError }, "error");
    }
  };

  function renderManagedArticles(post) {
    return <PostManagerCard key={post._id} post={post} />;
  }
  return (
    <>
      <Page title={`MongoLikes Dashboard`} />
      {data && !error && (
        <PostList posts={data?.posts} render={renderManagedArticles} />
      )}
      {error && (
        <div>
          If there is an error please try refreshing the page. Thank you.
        </div>
      )}
      <AddButton onClick={onOpen} />
      <CHModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        hasSubmit={true}
        title={
          <Heading
            as='h1'
            fontSize='5xl'
            textAlign='center'
            color='inherit'
            pt={12}
          >
            Create New Article
          </Heading>
        }
      >
        <CreatePostForm
          userId={userId}
          cb={onClose}
          handleCreate={handleCreate}
        />
      </CHModal>
    </>
  );
}

export function AddButton({ onClick }) {
  return (
    <Tooltip label='Create New Article' fontSize='sm' bg='gray.300'>
      <IconButton
        position='fixed'
        top={24}
        right={6}
        icon={<AddIcon />}
        colorScheme='green'
        onClick={onClick}
      />
    </Tooltip>
  );
}

export async function getServerSideProps(ctx) {
  // @HACK: check auth here, next-auth session is not avaialble when making the fetch request.
  const { getSession } = await import("next-auth/client");
  const session = await getSession(ctx);
  const isOwner = ctx.query.id === session.user._id;
  if (isOwner) {
    const { jsonFetcher } = await import("@/utils");
    const data = await jsonFetcher(`${ENDPOINT}/${ctx.query.id}`);
    if (!data)
      return {
        notFound: true,
      };

    return {
      props: {
        initialData: data,
        userId: session?.user?._id,
      },
    };
  } else {
    const errorMessage = "You don't have permission to access this page";
    return {
      redirect: {
        destination: `/user/${ctx.query.id}/posts/?${errorMessage}`,
        permanenet: false,
      },
      props: {},
    };
  }
}

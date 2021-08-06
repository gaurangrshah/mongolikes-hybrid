import { useRouter } from "next/router";

import {
  Heading,
  IconButton,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { Page } from "@/components/next";
import { CreatePostForm, PostList, PostManagerCard } from "@/components/posts";
import { CHModal } from "@/chakra";
import { Protected } from "@/components/auth";

import { useSWRPost } from "@/hooks/use-swr-post";

const ENDPOINT = `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/me`;

export default function Me({}) {
  const router = useRouter();
  const userId = router.asPath.split("/")[2];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, handleCreate, handlePublish, handleDelete } = useSWRPost(
    `${ENDPOINT}/${userId}`,
    { revalidateOnMount: true }
  );

  if (!error && !data) return <Spinner />;

  const handleCreateandClose = async (formValues) => {
    await handleCreate(formValues);
    onClose();
  };

  function renderManagedArticles(post) {
    return (
      <PostManagerCard
        key={post._id}
        post={post}
        handlePublish={handlePublish}
        handleDelete={handleDelete}
      />
    );
  }

  const published = data?.posts?.length
    ? data?.posts?.filter((post) => post.published)
    : [];
  const unpublished = data?.posts?.length
    ? data?.posts?.filter((post) => !post.published)
    : [];

  // render unpublished posts first in dashboard layout
  const arrayToRender = [...unpublished, ...published];

  return (
    <>
      <Page
        title={
          `${data?.username || data?.email.split("@")[0]}'s Dashboard` ||
          `MongoLikes user:${data._id}`
        }
      />
      {error && (
        <div>
          If there is an error please try refreshing the page. Thank you.
        </div>
      )}
      <Protected
        condition={data?.message?.includes("!Error")}
        redirectTo={`/?error="You must be authenticated first"`}
      >
        {arrayToRender && !error && (
          <PostList posts={arrayToRender} render={renderManagedArticles} />
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
            handleCreate={handleCreateandClose}
          />
        </CHModal>
      </Protected>
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

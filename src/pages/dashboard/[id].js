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

import { useSWRPost } from "@/hooks/use-swr-post";

const ENDPOINT = `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/me`;

export default function Me({ initialData, userId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, error, handleCreate, handlePublish, handleDelete } = useSWRPost(
    `${ENDPOINT}/${userId}`,
    { initialData }
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
      <Page title={`MongoLikes Dashboard`} />
      {arrayToRender && !error && (
        <PostList posts={arrayToRender} render={renderManagedArticles} />
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
          handleCreate={handleCreateandClose}
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
  // @HACK: verify user session before reqeust
  // next-auth session is not avaialble when making the fetch request from gssp
  const { getSession } = await import("next-auth/client");
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: `/user/${ctx.query.id}/posts/?error=you must be signed in first.}`,
        permanenet: false,
      },
      props: {},
    };
  }

  const isOwner = ctx.query.id === session.user._id;
  if (isOwner) {
    const { jsonFetcher } = await import("@/utils");
    const data = await jsonFetcher(`${ENDPOINT}/${ctx.query.id}`);
    if (!data) return { notFound: true };

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

import { SimpleGrid } from "@chakra-ui/react";

import { PostCard } from "./PostCard";

export const PostList = ({ data, render = renderPosts }) => {
  return (
    <SimpleGrid
      w='full'
      maxW='container.lg'
      mx='auto'
      columns={2}
      gap={3}
      p={6}
    >
      {data?.length && data?.map(render)}
    </SimpleGrid>
  );
};

function renderPosts(post) {
  if (!post) return;
  return <PostCard key={post._id} post={post} />;
}

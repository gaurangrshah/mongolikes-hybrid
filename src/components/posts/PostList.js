import { SimpleGrid } from "@chakra-ui/react";

import { PostCard } from "./PostCard";

export const PostList = ({ posts, render = renderPosts }) => {
  return (
    <SimpleGrid
      w='full'
      maxW='container.lg'
      mx='auto'
      columns={[1, null, 2]}
      gap={3}
      p={6}
    >
      {posts?.length && posts?.map(render)}
    </SimpleGrid>
  );
};

function renderPosts(post) {
  if (!post) return;
  return <PostCard key={post._id} post={post} />;
}

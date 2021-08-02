import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { Image } from "@/components/next/NextImage";
import { ChNextButtonLink } from "@/components/next/NextLink";

export default function NotFound() {
  return (
    <VStack justify='center' align='center'>
      <Heading>Hmmmmmm..</Heading>
      <Text mb={12}>These are not the posts you're looking for</Text>
      <ChNextButtonLink href='/'>Go Back</ChNextButtonLink>
      <Box py={16}>
        <Image src='/404.png' width='500' height='500' alt='made by kapwing' />
      </Box>
    </VStack>
  );
}

import { Box, Heading, HStack, VStack } from "@chakra-ui/react";

import { Image } from "@/components/next/NextImage";
import { ChNextLink } from "@/components/next/NextLink";
import { UserMenu } from "@/components/auth/UserMenu";

export function DefaultLayout({ children }) {
  return (
    <VStack id='page-wrap' minH='100vh' overflowX='hidden'>
      <Header />
      <VStack as='main' w='full' h='full' flex={1}>
        {children}
      </VStack>
      <Footer />
    </VStack>
  );
}

function Header(props) {
  return (
    <HStack
      as='header'
      w='full'
      maxH='100px'
      border='1px'
      p={2}
      justify='space-between'
      flex={0}
    >
      <ChNextLink href='/'>
        <HStack>
          <Image src='/mongolikes.svg' width={42} height={42} />
          <Heading fontSize='2xl' color='blue.600'>
            MongoLikes
          </Heading>
        </HStack>
      </ChNextLink>
      <Box as='span'>
        {/* @HACK: menu cannot be placed w/in a flex element, used Box as Wrapper  */}
        <UserMenu />
      </Box>
    </HStack>
  );
}

function Footer(props) {
  return (
    <Box as='footer' w='full' maxH='100px' flex={0} p={2} border='1px'>
      <Heading>
        <ChNextLink href='/'>
          <Image src='/mongolikes.svg' width='50' height='35' />
        </ChNextLink>
      </Heading>
    </Box>
  );
}

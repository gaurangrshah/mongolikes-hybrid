import { Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/client";

import { ChNextLink } from "@/components/next/NextLink";

export function UserMenu() {
  const [session] = useSession();
  const handleLogout = async (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <Menu
      m={0}
      p={0}
      placement='bottom-end'
      boundary='scrollParent'
      offset={8}
      closeOnSelect
    >
      <Avatar
        as={MenuButton}
        name={session?.user.email}
        src={session?.user.image}
        _hover={{ cursor: "pointer" }}
        loading='lazy'
      />
      <MenuList>
        {!session ? (
          <>
            <MenuItem>
              <ChNextLink href='/api/auth/signin' chProps={{ w: "full" }}>
                Sign in
              </ChNextLink>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem>
              <ChNextLink
                href={`/dashboard/${session?.user?._id}`}
                chProps={{ w: "full" }}
              >
                Dashboard
              </ChNextLink>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ChNextLink href='/api/auth/signout' chProps={{ w: "full" }}>
                Sign Out
              </ChNextLink>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
}

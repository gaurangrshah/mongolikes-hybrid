import { Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";

import { ChNextLink } from "@/components/next/NextLink";

export function UserMenu() {
  const router = useRouter();
  const [session, loading] = useSession();

  const handleLogout = async (e) => {
    e.preventDefault();
    signOut();
  };

  const defaultLinks = [
    { label: "home", href: "/" },
    { label: "client", href: "/clent" },
    { label: "server", href: "/server" },
    { label: "protected", href: "/protected" },
    { label: "api", href: "/api" },
  ];

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
        name={!loading && session?.user?.email}
        src={!loading && session?.user?.image}
        _hover={{ cursor: "pointer" }}
        loading='lazy'
      />
      <MenuList>
        {!session && !loading ? (
          <>
            <MenuItem
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              <ChNextLink href='/api/auth/signin' chProps={{ w: "full" }}>
                Sign in
              </ChNextLink>
            </MenuItem>
            <MenuItem>
              <ChNextLink href='/register' chProps={{ w: "full" }}>
                Sign up
              </ChNextLink>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem>
              <ChNextLink
                href={`/users/${session?.user?.name}`}
                chProps={{ w: "full" }}
              >
                Profile
              </ChNextLink>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ChNextLink href='/api/auth/signout' chProps={{ w: "full" }}>
                Sign Out
              </ChNextLink>
            </MenuItem>
          </>
        )}
        <hr />
        <>
          {defaultLinks.map((link) => (
            <MenuItem key={link.href} href={link.href}>
              {link.label}
            </MenuItem>
          ))}
        </>
      </MenuList>
    </Menu>
  );
}

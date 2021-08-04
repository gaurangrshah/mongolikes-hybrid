import { useRouter } from "next/router";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/client";

import { ChNextLink } from "@/components/next/NextLink";

const defaultLinks = [
  { label: "home", href: "/" },
  { label: "client", href: "/client" },
  { label: "server", href: "/server" },
  { label: "protected", href: "/protected" },
  { label: "api", href: "/api-status" },
];

export function UserMenu() {
  const router = useRouter();
  const [session, loading] = useSession();
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
                href={`/dashboard/${session?.user?._id}`}
                chProps={{ w: "full" }}
              >
                dashboard
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
            <MenuItem key={link.href}>
              <ChNextLink href={link.href} chProps={{ w: "full" }}>
                {link.label}
              </ChNextLink>
            </MenuItem>
          ))}
        </>
      </MenuList>
    </Menu>
  );
}

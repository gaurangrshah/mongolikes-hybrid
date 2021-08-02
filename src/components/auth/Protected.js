import { Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/client";

import { AccessDenied } from "./AccessDenied";

export function Protected({ children }) {
  const [session, loading] = useSession();

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return <Spinner />;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <>
        <AccessDenied />
      </>
    );
  }
  return <div>{children}</div>;
}

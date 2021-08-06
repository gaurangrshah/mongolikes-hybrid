import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { Spinner } from "@chakra-ui/react";

import { AccessDenied } from "./AccessDenied";

export function Protected({ condition = false, redirectTo, children }) {
  const [session, loading] = useSession();
  const router = useRouter();
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return <Spinner />;

  useEffect(() => {
    if (session) return;
    console.log("redirecting user to", redirectTo);
  }, [session]);

  if (condition) {
    console.log("condition is true");
    router.replace(redirectTo);
    return null;
  }

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

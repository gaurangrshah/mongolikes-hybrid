import { useEffect } from "react";
import { useRouter } from "next/router";
import { useToastDispatch } from "@/chakra/contexts/toast-context";

export function MessageRouter({ asPath, children }) {
  const router = useRouter();
  // success and error toast notifications from url paths handled via _app.js
  const { setMsg } = useToastDispatch();
  let error, success;

  if (process.browser) {
    error =
      asPath.includes("?error") &&
      decodeURIComponent(asPath.split("?error=")[1]);
    success =
      asPath.includes("?success") &&
      decodeURIComponent(asPath.split("?success=")[1]);
  }

  useEffect(() => {
    if (!error) return;
    setMsg({ description: error }, "error");
    router.replace(router.asPath.split("?error=")[0]);
  }, [error]);

  useEffect(() => {
    if (!success) return;
    setMsg({ description: success }, "success");
    router.replace(router.asPath.split("?success=")[0]);
  }, [success]);

  return <>{children}</>;
}

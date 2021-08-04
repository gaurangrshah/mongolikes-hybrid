import { useEffect, useState } from "react";
import { envs } from "@/app-config";

export function useWindowMounted() {
  const [mounted, setMounted] = useState(false);
  const { isSSR } = envs;

  useEffect(() => {
    if (isSSR) return;
    setMounted(true);
    return () => setMounted(false);
  }, [isSSR]);

  return mounted;
}

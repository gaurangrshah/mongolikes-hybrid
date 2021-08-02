import { useEffect, useState } from "react";
import appConfig from "@/app-config";

export function useWindowMounted() {
  const [mounted, setMounted] = useState(false);
  const {
    envs: { isSSR },
  } = appConfig;

  useEffect(() => {
    if (isSSR) return;
    setMounted(true);
    return () => setMounted(false);
  }, [isSSR]);

  return mounted;
}

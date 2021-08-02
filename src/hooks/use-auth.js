import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export const useAuth = () => {
  const [session, loading] = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(Boolean(session));
    return () => setIsAuthenticated(false);
  }, [session]);
  return {
    isAuthenticated,
    session,
    loading,
    signIn,
    signOut,
  };
};

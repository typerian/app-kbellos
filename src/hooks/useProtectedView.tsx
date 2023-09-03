import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useProtectedView(location: string) {
  const router = useRouter();
  const { sessionId } = useAuth();

  useEffect(() => {
    if (!sessionId) {
      void router.push(location);
    }
  }, [location, router, sessionId]);

  return { sessionId };
}

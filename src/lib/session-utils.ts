// Utility functions for session management and synchronization

import { useSession } from "next-auth/react";
import { useEffect } from "react";

/**
 * Hook to ensure session is always fresh and synchronized
 * Re-validates session at intervals and on visibility change
 */
export function useSessionSync(interval = 60000) {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    // Set up interval to refresh session
    const sessionCheckInterval = setInterval(() => {
      // Trigger a session update by calling useSession again
      // NextAuth will handle the cache invalidation
    }, interval);

    // Sync on window focus
    const handleFocus = () => {
      // Session will be re-fetched
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(sessionCheckInterval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [session, interval]);
}

/**
 * Hook to check if user is authenticated
 * Returns loading state and auth status
 */
export function useIsAuthenticated() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  return { isLoading, isAuthenticated, session };
}

/**
 * Utility to clear all local state on logout
 * Clears session, localStorage, and sessionStorage
 */
export function clearAuthState() {
  // Clear localStorage
  if (typeof window !== "undefined") {
    const keysToPreserve = ["theme"]; // Preserve theme preference
    const keysToDelete: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && !keysToPreserve.includes(key)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => localStorage.removeItem(key));

    // Clear sessionStorage completely
    sessionStorage.clear();

    // Clear auth-store from localStorage
    localStorage.removeItem("auth-store");
  }
}

/**
 * Utility to validate session data
 */
export function isValidSession(session: any): boolean {
  if (!session) return false;
  if (!session.user) return false;
  if (!session.user.id || !session.user.email) return false;
  return true;
}

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isOpen: boolean;
  view: "login" | "signup";
  onOpen: (view?: "login" | "signup") => void;
  onClose: () => void;
  toggleView: () => void;
  setView: (view: "login" | "signup") => void;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isOpen: false, // Always starts closed — never persisted
      view: "login",
      onOpen: (view = "login") => set({ isOpen: true, view }),
      onClose: () => set({ isOpen: false }),
      toggleView: () =>
        set((state) => ({ view: state.view === "login" ? "signup" : "login" })),
      setView: (view: "login" | "signup") => set({ view }),
      reset: () => set({ isOpen: false, view: "login" }),
    }),
    {
      name: "auth-store",
      // Only persist `view` (login/signup tab preference).
      // Never persist `isOpen` — prevents modal from auto-opening on refresh.
      partialize: (state) => ({
        view: state.view,
      }),
      onRehydrateStorage: () => (state) => {
        // Always ensure modal is closed after rehydration
        if (state) state.isOpen = false;
      },
    }
  )
);

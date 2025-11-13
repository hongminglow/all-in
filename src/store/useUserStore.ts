import { create } from "zustand";
import type { TUserDetails } from "~/types/user";
import { persist } from "zustand/middleware";

type TUserStoreState = {
  user: TUserDetails | null;
  balance: number | null;
};

type TUserStoreActions = {
  setUser: (user: TUserDetails | null) => void;
  setBalance: (balance: number | null) => void;
  reset: () => void;
};

export const useUserStore = create<
  TUserStoreState & { actions: TUserStoreActions }
>()(
  persist(
    (set) => ({
      user: null,
      balance: null,
      actions: {
        setUser: (user: TUserDetails | null) => set(() => ({ user })),
        setBalance: (balance: number | null) => set(() => ({ balance })),
        reset: () => set(() => ({ user: null, balance: null })),
      },
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        user: state.user,
        balance: state.balance,
      }),
    }
  )
);

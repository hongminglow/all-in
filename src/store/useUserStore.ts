import { create } from "zustand";
import type { TUserDetails } from "~/types/user";

type TUserStoreState = {
  user: TUserDetails | null;
  balance: number | null;
};

type TUserStoreActions = {
  setUser: (user: TUserDetails | null) => void;
  setBalance: (balance: number | null) => void;
};

export const useUserStore = create<
  TUserStoreState & { actions: TUserStoreActions }
>((set) => ({
  user: null,
  balance: null,
  actions: {
    setUser: (user: TUserDetails | null) => set(() => ({ user })),
    setBalance: (balance: number | null) => set(() => ({ balance })),
  },
}));

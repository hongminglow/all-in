import { create } from "zustand";

type TGlobalStoreState = {
  accessToken: string | null;
};

type TGlobalStoreActions = {
  setAccessToken: (token: string | null) => void;
};

export const useGlobalStore = create<
  TGlobalStoreState & { actions: TGlobalStoreActions }
>((set) => ({
  accessToken: null,
  actions: {
    setAccessToken: (token: string | null) =>
      set(() => ({ accessToken: token })),
  },
}));

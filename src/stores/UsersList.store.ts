import { UsersListState } from "@interfaces/user/UserStore.interface";
import { create } from "zustand";

export const useUsersListStore = create<UsersListState>((set) => ({
  skip: 0,
  setSkip: (skip) => set(() => ({ skip })),
  clearSkip: () =>
    set({
      skip: 0,
    }),
}));

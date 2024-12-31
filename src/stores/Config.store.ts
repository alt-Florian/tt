import { ConfigState } from "@interfaces/config/ConfigStore.interface";
import { create } from "zustand";

export const useConfigStore = create<ConfigState>((set) => ({
  scope: 5,
  skip: 0,
  setScope: (scope) => {
    set(() => ({ scope }));
    set({
      skip: 0,
    });
  },
  setSkip: (skip) => set(() => ({ skip })),
  clearConfigScope: () =>
    set({
      scope: 5,
    }),
  clearPagination: () =>
    set({
      skip: 0,
    }),

  lettersTemplate: [],
  isLoading: false,
  error: null,
  setLettersTemplate: (lettersTemplate) => set({ lettersTemplate }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading })
}));

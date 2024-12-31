import { AuthState } from "@interfaces/auth/AuthStore.interface";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  refreshToken: null,
  user: null,
  filters: [],
  setAuthState: (newState: Partial<AuthState>) =>
    set((state) => ({ ...state, ...newState })),
  clearAuthState: () =>
    set({
      token: null,
      refreshToken: null,
      user: null,
      filters: [],
    }),
}));

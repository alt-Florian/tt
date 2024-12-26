import { Filter } from "@interfaces/auth/Filter.interface";

interface User {
  email: string;
  firstname: string;
  lastname: string;
  role: number;
}

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  filters: Filter[];
  setAuthState: (newState: Partial<AuthState>) => void;
  clearAuthState: () => void;
}

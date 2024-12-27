import { FilterDefinition } from "@utils/table/interfaces";

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
  filters: FilterDefinition[];
  setAuthState: (newState: Partial<AuthState>) => void;
  clearAuthState: () => void;
}

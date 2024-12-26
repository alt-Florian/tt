import { UserData } from "./User.interface";



export interface UsersListState {
  skip: number;
  setSkip: (skip: number) => void;
  clearSkip: () => void;
  users: UserData[];
  isLoading: boolean;
  error: Error | null;
  setUsers: (users: UserData[]) => void;
  setError: (error: Error | null) => void;
  setLoading: (isLoading: boolean) => void;
}

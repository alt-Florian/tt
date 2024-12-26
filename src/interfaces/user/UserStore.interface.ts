export interface UsersListState {
  skip: number;
  setSkip: (skip: number) => void;
  clearSkip: () => void;
}

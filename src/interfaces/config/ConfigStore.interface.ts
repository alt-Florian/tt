export interface ConfigState {
  scope: number;
  skip: number;
  setScope: (scope: number) => void;
  setSkip: (skip: number) => void;
  clearConfigScope: () => void;
  clearPagination: () => void;
}

import { LetterTemplateData } from "./LetterTemplate.interface";

export interface ConfigState {
  scope: number;
  skip: number;
  setScope: (scope: number) => void;
  setSkip: (skip: number) => void;
  clearConfigScope: () => void;
  clearPagination: () => void;
  lettersTemplate: LetterTemplateData[];
  isLoading: boolean;
  error: Error | null;
  setLettersTemplate: (users: LetterTemplateData[]) => void;
  setError: (error: Error | null) => void;
  setLoading: (isLoading: boolean) => void;
}

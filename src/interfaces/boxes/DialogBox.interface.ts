import { ReactNode } from "react";

export interface DialogBoxInterface {
  title: string;
  content: string;
  onClick?: () => void;
  icon?: ReactNode;
  show?: boolean;
}
import { ReactElement } from "react";

export interface ModalBoxInterface {
  open?: boolean;
  content?: ReactElement;
  handleCloseModal?: () => void
}
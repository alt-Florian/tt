import { ReactElement } from "react";

export interface FeedBackBoxInterface {
  title: string;
  content: string;
  icon: ReactElement;
  handleSubmit?: () => void;
  handleClose?: () => void;
  validationLabel?: string;
  cancelLabel?: string;
}

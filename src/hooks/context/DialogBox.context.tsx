import { DialogBoxInterface } from "@interfaces/boxes/DialogBox.interface";
import React, { createContext, ReactNode, useState } from "react";

interface DialogBoxContextProps {
  dialogBox: DialogBoxInterface | null;
  showDialogBox: (dialogBox: DialogBoxInterface) => void;
  hideDialogBox: () => void;
}

export const DialogBoxContext = createContext<DialogBoxContextProps>({
  dialogBox: null,
  showDialogBox: () => {},
  hideDialogBox: () => {},
});

export const DialogBoxProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dialogBox, setDialogBox] = useState<DialogBoxInterface | null>(null);

  const showDialogBox = (notif: DialogBoxInterface) => {
    setDialogBox({ ...notif, show: true });
  };

  const hideDialogBox = () => {
    setDialogBox(null);
  };

  return (
    <DialogBoxContext.Provider
      value={{ dialogBox, showDialogBox, hideDialogBox }}
    >
      {children}
    </DialogBoxContext.Provider>
  );
};

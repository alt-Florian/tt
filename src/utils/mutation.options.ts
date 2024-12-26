import { dialogService } from "@services/Dialog.service";
import { DialogBox } from "@stores/DialogBox.store";
import { NavigateFunction } from "react-router-dom";

export const mutationOptionsForCustomerForm = (
  handleClose: () => void,
  showDialogBox: (dialogBox: DialogBox) => void,
  hideDialogBox: () => void
) => {
  return {
    onSuccess: () => {
      showDialogBox({
        ...dialogService.successMessage(),
        onClick: () => {
          hideDialogBox();
        },
      });
      handleClose();
    },
    onError: (error: any) => {
      if (error.status !== 403 && error.status !== 409) {
        showDialogBox({
          ...dialogService.errorMessage(),
          onClick: () => {
            hideDialogBox();
          },
        });
        handleClose();
      }
    },
  };
};

export const mutationOptionsForConfigForms = (
  showDialogBox: (dialogBox: DialogBox) => void,
  hideDialogBox: () => void,
  navigate: NavigateFunction,
  listPath: string
) => {
  return {
    onSuccess: () => {
      showDialogBox({
        ...dialogService.successMessage(),
        onClick: () => {
          hideDialogBox();
        },
      });
      navigate(listPath);
    },
    onError: (error: any) => {
      if (error.status !== 409) {
        showDialogBox({
          ...dialogService.errorMessage(),
          onClick: () => {
            hideDialogBox();
          },
        });
        navigate(listPath);
      }
    },
  };
};

import { FeedBackBox } from "@components/feedBack/FeedBackBox";
import {
  Patrimony,
  PatrimonyResponse,
} from "@interfaces/customer/Patrimony.interface";
import { PatrimonyPhysicalSchema } from "@schemas/customer/Patrimony.schema";
import { patrimonyService } from "@services/customer/Patrimony.service";
import { dialogService } from "@services/Dialog.service";
import { feedBackService } from "@services/FeedBack.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useModalBoxStore } from "@stores/modalbox.store";
import { UseMutationResult } from "@tanstack/react-query";
import { useFormik } from "formik";

export function PatrimonyPhysicalFormViewModel(
  id: string,
  handleClose: () => void,
  patrimonyId?: string
) {
  // Distinct creation and update form
  const isUpdate = patrimonyId !== undefined;
  //Handle dialogs
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();

  // Mutation functions and values initialization
  let isPending;
  let isError;
  let isPendingOnMutation;
  let mutationCreate: UseMutationResult<
    PatrimonyResponse,
    any,
    { customerId: string; patrimony: Patrimony }
  >;
  let mutationUpdate: UseMutationResult<
    PatrimonyResponse,
    any,
    {
      customerId: string;
      patrimonyId: string;
      patrimony: Partial<Patrimony>;
    }
  >;
  let mutationDelete: UseMutationResult<
    PatrimonyResponse,
    any,
    { customerId: string; patrimonyId: string }
  >;
  let initialValues = {
    year: "",
    fiscalTax: undefined as number | undefined,
    payedTax: undefined as number | undefined,
    socialTax: undefined as number | undefined,
  };

  // Mutation assignation depending on isUpdate + existing datas fetching and adding to update Form
  if (isUpdate) {
    mutationUpdate = patrimonyService.updatePatrimony();
    isPendingOnMutation = mutationUpdate.isPending;

    mutationDelete = patrimonyService.deletePatrimony();

    const {
      data,
      isPending: isPendingPatrimony,
      isError: isErrorPatrimony,
    } = patrimonyService.getCustomerPatrimony(id);

    isPending = isPendingPatrimony;
    isError = isErrorPatrimony;
    if (!isPendingPatrimony && !isErrorPatrimony && data) {
      initialValues = { ...initialValues, ...data.datas };
    }
  } else {
    mutationCreate = patrimonyService.createPatrimony();
    isPendingOnMutation = mutationCreate.isPending;
  }

  // Formik setup
  const { handleSubmit, handleChange, errors, values, touched } = useFormik({
    initialValues,
    validationSchema: PatrimonyPhysicalSchema,
    enableReinitialize: true,
    onSubmit: () => {
      if (isUpdate) {
        mutationUpdate.mutate(
          {
            customerId: id,
            patrimonyId,
            patrimony: values,
          },
          {
            onSuccess: () => {
              showDialogBox({
                ...dialogService.successMessage(),
                onClick: () => {
                  hideDialogBox();
                },
              });
              handleClose();
            },
            onError: () => {
              showDialogBox({
                ...dialogService.successMessage(),
                onClick: () => {
                  hideDialogBox();
                },
              });
              handleClose();
            },
          }
        );
      } else {
        mutationCreate.mutate(
          { customerId: id, patrimony: values },
          {
            onSuccess: () => {
              showDialogBox({
                ...dialogService.successMessage(),
                onClick: () => {
                  hideDialogBox();
                },
              });
              handleClose();
            },
            onError: () => {
              showDialogBox({
                ...dialogService.successMessage(),
                onClick: () => {
                  hideDialogBox();
                },
              });
              handleClose();
            },
          }
        );
      }
    },
  });

  // ConfirmDelete modalbox handling
  let openConfirmDeleteModal = () => {};
  if (patrimonyId) {
    const { hideModalBox, showModalBox } = useModalBoxStore();
    const handleDelete = (patrimonyId: string) => {
      mutationDelete.mutate(
        { customerId: id, patrimonyId },
        {
          onSuccess: () => {
            showDialogBox({
              ...dialogService.successMessage(),
              onClick: () => {
                hideDialogBox();
              },
            });
            handleClose();
          },
          onError: () => {
            showDialogBox({
              ...dialogService.successMessage(),
              onClick: () => {
                hideDialogBox();
              },
            });
            handleClose();
          },
        }
      );
    };

    openConfirmDeleteModal = () => {
      showModalBox({
        content: (
          <FeedBackBox
            {...feedBackService.deleteConfirmation()}
            handleSubmit={() => {
              handleDelete(patrimonyId);
            }}
            handleClose={hideModalBox}
          />
        ),
        handleCloseModal: hideModalBox,
      });
    };
  }

  return {
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
    isUpdate,
    openConfirmDeleteModal,
    isPending,
    isError,
    isPendingOnMutation,
  };
}

import { FeedBackBox } from "@components/feedBack/FeedBackBox";
import {
  CustomersPatrimonyResponse,
  Patrimony,
} from "@interfaces/customer/Patrimony.interface";
import { PatrimonyPhysicalSchema } from "@schemas/customer/Patrimony.schema";
import { patrimonyService } from "@services/customer/Patrimony.service";
import { dialogService } from "@services/Dialog.service";
import { feedBackService } from "@services/FeedBack.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useModalBoxStore } from "@stores/modalbox.store";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";

export function PatrimonyPhysicalFormViewModel(
  id: string,
  handleClose: () => void,
  patrimonyId?: string
) {
  const queryClient = useQueryClient();
  // Distinct creation and update form
  const isUpdate = patrimonyId !== undefined;
  //Handle dialogs and modals
  const { hideModalBox, showModalBox } = useModalBoxStore();
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();
  // Mutation functions and values initialization
  let isPending;
  let isError;
  let isPendingOnMutation;
  let isErrorOnMutation;
  let errorOnMutation;
  let mutationCreate: UseMutationResult<
    CustomersPatrimonyResponse,
    any,
    { customerId: string; patrimony: Patrimony }
  >;
  let mutationUpdate: UseMutationResult<
    CustomersPatrimonyResponse,
    any,
    {
      customerId: string;
      patrimonyId: string;
      patrimony: Partial<Patrimony>;
    }
  >;
  let mutationDelete: UseMutationResult<
    CustomersPatrimonyResponse,
    any,
    { customerId: string; patrimonyId: string }
  >;
  let initialValues = {
    year: "",
    fiscalTax: "" as string | number,
    payedTax: "" as string | number,
    socialTax: "" as string | number,
  };

  // Mutation assignation depending on isUpdate + existing datas fetching and adding to update Form
  if (isUpdate) {
    mutationUpdate = patrimonyService.updatePatrimony();
    isPendingOnMutation = mutationUpdate.isPending;
    isErrorOnMutation = mutationUpdate.isError;
    errorOnMutation = mutationUpdate.error;

    mutationDelete = patrimonyService.deletePatrimony();

    const {
      data,
      isPending: isPendingPatrimony,
      isError: isErrorPatrimony,
    } = patrimonyService.getCustomerPatrimony(id);

    isPending = isPendingPatrimony;
    isError = isErrorPatrimony;
    if (!isPendingPatrimony && !isErrorPatrimony && data) {
      const patrimonyToUpdate = data.datas.datas.find(
        (patrimony) => patrimony._id === patrimonyId
      );
      if (patrimonyToUpdate) {
        initialValues.year = patrimonyToUpdate.year;
        initialValues.fiscalTax = patrimonyToUpdate.fiscalTax || "";
        initialValues.payedTax = patrimonyToUpdate.payedTax || "";
        initialValues.socialTax = patrimonyToUpdate.socialTax || "";
      }
    }
  } else {
    mutationCreate = patrimonyService.createPatrimony();
    isPendingOnMutation = mutationCreate.isPending;
    isErrorOnMutation = mutationCreate.isError;
    errorOnMutation = mutationCreate.error;
  }

  // Formik setup
  const { handleSubmit, handleChange, errors, values, touched } = useFormik({
    initialValues,
    validationSchema: PatrimonyPhysicalSchema,
    enableReinitialize: true,
    onSubmit: () => {
      const updatedValues = {
        year: values.year,
        fiscalTax: Number(values.fiscalTax),
        payedTax: Number(values.payedTax),
        socialTax: Number(values.socialTax),
      };
      if (isUpdate) {
        mutationUpdate.mutate(
          {
            customerId: id,
            patrimonyId,
            patrimony: updatedValues,
          },
          {
            onSuccess: () => {
              showDialogBox({
                ...dialogService.successMessage(),
                onClick: () => {
                  hideDialogBox();
                },
              });
              queryClient.invalidateQueries({
                queryKey: [`physicalCustomerProfile${id}`],
              });
              handleClose();
            },
            onError: (error) => {
              if (error.status !== 400) {
                showDialogBox({
                  ...dialogService.errorMessage(),
                  onClick: () => {
                    hideDialogBox();
                  },
                });
                handleClose();
              }
            },
          }
        );
      } else {
        mutationCreate.mutate(
          { customerId: id, patrimony: updatedValues },
          {
            onSuccess: () => {
              showDialogBox({
                ...dialogService.successMessage(),
                onClick: () => {
                  hideDialogBox();
                },
              });
              queryClient.invalidateQueries({
                queryKey: [`physicalCustomerProfile${id}`],
              });
              handleClose();
            },
            onError: (error) => {
              if (error.status !== 400) {
                showDialogBox({
                  ...dialogService.errorMessage(),
                  onClick: () => {
                    hideDialogBox();
                  },
                });
                handleClose();
              }
            },
          }
        );
      }
    },
  });

  // ConfirmDelete modalbox handling
  let openConfirmDeleteModal = () => {};
  if (patrimonyId) {
    const handleDelete = (patrimonyId: string) => {
      mutationDelete.mutate(
        { customerId: id, patrimonyId: patrimonyId },
        {
          onSuccess: () => {
            showDialogBox({
              ...dialogService.successMessage(),
              onClick: () => {
                hideDialogBox();
              },
            });
          },
          onError: () => {
            showDialogBox({
              ...dialogService.successMessage(),
              onClick: () => {
                hideDialogBox();
              },
            });
          },
        }
      );
      queryClient.invalidateQueries({
        queryKey: [`physicalCustomerProfile${id}`],
      });
      handleClose();
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
    isErrorOnMutation,
    errorOnMutation,
  };
}

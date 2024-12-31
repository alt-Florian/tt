import { FeedBackBox } from "@components/feedBack/FeedBackBox";
import {
  CustomersPatrimonyResponse,
  Patrimony,
} from "@interfaces/customer/Patrimony.interface";
import { PatrimonyCorporateSchema } from "@schemas/customer/Patrimony.schema";
import { patrimonyService } from "@services/customer/Patrimony.service";
import { dialogService } from "@services/Dialog.service";
import { feedBackService } from "@services/FeedBack.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useModalBoxStore } from "@stores/modalbox.store";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";

export function PatrimonyCorporateFormViewModel(
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
    equity: "" as string | number,
    ca: "" as string | number,
    netResult: "" as string | number,
    netAsset: "" as string | number,
    effectif: "" as string | number,
    VAT: null as boolean | null,
    corporateTax: null as boolean | null,
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
        initialValues.equity = patrimonyToUpdate.equity || "";
        initialValues.ca = patrimonyToUpdate.ca || "";
        initialValues.netResult = patrimonyToUpdate.netResult || "";
        initialValues.netAsset = patrimonyToUpdate.netAsset || "";
        initialValues.effectif = patrimonyToUpdate.effectif || "";
        if (patrimonyToUpdate.VAT === undefined) {
          initialValues.VAT = null;
        } else {
          initialValues.VAT = patrimonyToUpdate.VAT;
        }
        if (patrimonyToUpdate.corporateTax === undefined) {
          initialValues.corporateTax = null;
        } else {
          initialValues.corporateTax = patrimonyToUpdate.corporateTax;
        }
      }
    }
  } else {
    mutationCreate = patrimonyService.createPatrimony();
    isPendingOnMutation = mutationCreate.isPending;
    isErrorOnMutation = mutationCreate.isError;
    errorOnMutation = mutationCreate.error;
  }

  // Formik setup
  const { handleSubmit, handleChange, errors, values, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: PatrimonyCorporateSchema,
      enableReinitialize: true,
      onSubmit: () => {
        const updatedValues = {
          year: values.year,
          equity: Number(values.equity),
          ca: Number(values.ca),
          netResult: Number(values.netResult),
          netAsset: Number(values.netAsset),
          effectif: Number(values.effectif),
          VAT: values.VAT,
          corporateTax: values.corporateTax,
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
                  queryKey: [`corporateCustomerProfile${id}`],
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
                  queryKey: [`corporateCustomerProfile${id}`],
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
        queryKey: [`corporateCustomerProfile${id}`],
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
    setFieldValue,
    isUpdate,
    openConfirmDeleteModal,
    isPending,
    isError,
    isPendingOnMutation,
    isErrorOnMutation,
    errorOnMutation,
  };
}

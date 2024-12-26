import { FeedBackBox } from "@components/feedBack/FeedBackBox";
import {
  CustomerConfig,
  CustomerConfigResponse,
} from "@interfaces/config/CustomerConfig.interface";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import { CustomerConfigSchema } from "@schemas/config/CustomerConfig.schema";
import { customerConfigService } from "@services/config/CustomerConfig.service";
import { dialogService } from "@services/Dialog.service";
import { feedBackService } from "@services/FeedBack.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useModalBoxStore } from "@stores/modalbox.store";
import { UseMutationResult } from "@tanstack/react-query";
import Globals from "@utils/Globals";
import { mutationOptionsForConfigForms } from "@utils/mutation.options";
import { useFormik } from "formik";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export function CustomerConfigFormViewModel() {
  // Distinct creation and update form
  const { id } = useParams();
  const isUpdate = id !== undefined;

  const [searchParams] = useSearchParams();
  const skip = Number(searchParams.get("skip")) || 0;

  //Handle navigation
  const navigate = useNavigate();
  const listPath =
    Globals.configTypes.find((config) => config.scope === 10)?.path || "";
  const listPathWithSkip = `${listPath}?skip=${skip}`;

  //Handle dialogs
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();

  // Mutation functions and values initialization
  let isPending;
  let isError;
  let isPendingOnMutation;
  let isErrorOnMutation;
  let errorOnMutation;
  let mutationCreate: UseMutationResult<
    CustomerConfigResponse,
    any,
    CustomerConfig
  >;
  let mutationUpdate: UseMutationResult<
    CustomerConfigResponse,
    any,
    {
      id: string;
      newCustomerConfig: Partial<CustomerConfig>;
    }
  >;
  let mutationDelete: UseMutationResult<DeleteResponse, any, string>;
  let initialValues = {
    name: "",
    colorCode: "",
  };

  // Mutation assignation depending on isUpdate + existing datas fetching and adding to update Form
  if (isUpdate) {
    mutationUpdate = customerConfigService.updateCustomerConfig();
    isPendingOnMutation = mutationUpdate.isPending;
    isErrorOnMutation = mutationUpdate.isError;
    errorOnMutation = mutationUpdate.error;

    mutationDelete = customerConfigService.deleteCustomerConfig();

    const {
      data,
      isPending: isPendingCustomerConfig,
      isError: isErrorCustomerConfig,
    } = customerConfigService.getCustomerConfigById(id);

    isPending = isPendingCustomerConfig;
    isError = isErrorCustomerConfig;

    if (!isPending && !isError && data) {
      initialValues = { ...initialValues, ...data.datas };
    }
  } else {
    mutationCreate = customerConfigService.createCustomerConfig();
    isPendingOnMutation = mutationCreate.isPending;
    isErrorOnMutation = mutationCreate.isError;
    errorOnMutation = mutationCreate.error;
  }

  // Formik setup
  const { handleSubmit, handleChange, errors, values, touched } = useFormik({
    initialValues,
    validationSchema: CustomerConfigSchema,
    enableReinitialize: true,
    onSubmit: () => {
      if (isUpdate) {
        mutationUpdate.mutate(
          { id, newCustomerConfig: values },
          mutationOptionsForConfigForms(
            showDialogBox,
            hideDialogBox,
            navigate,
            listPathWithSkip
          )
        );
      } else {
        mutationCreate.mutate(
          values,
          mutationOptionsForConfigForms(
            showDialogBox,
            hideDialogBox,
            navigate,
            listPathWithSkip
          )
        );
      }
    },
  });

  // ConfirmDelete modalbox handling
  let openConfirmDeleteModal = () => {};
  if (id) {
    const { hideModalBox, showModalBox } = useModalBoxStore();
    const handleDelete = (id: string) => {
      mutationDelete.mutate(id, {
        onSuccess: () => {
          showDialogBox({
            ...dialogService.successMessage(),
            onClick: () => {
              hideDialogBox();
            },
          });
          navigate(listPathWithSkip);
        },
        onError: (error) => console.log(error),
      });
    };

    openConfirmDeleteModal = () => {
      showModalBox({
        content: (
          <FeedBackBox
            {...feedBackService.deleteConfirmation()}
            handleSubmit={() => {
              handleDelete(id);
              hideModalBox();
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
    id,
    openConfirmDeleteModal,
    navigate,
    listPathWithSkip,
    isPending,
    isError,
    isPendingOnMutation,
    isErrorOnMutation,
    errorOnMutation,
  };
}

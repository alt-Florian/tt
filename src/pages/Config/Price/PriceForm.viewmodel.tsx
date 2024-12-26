import { FeedBackBox } from "@components/feedBack/FeedBackBox";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import { Price, PriceResponse } from "@interfaces/config/Price.interface";
import { PriceSchema } from "@schemas/config/Price.schema";
import { priceService } from "@services/config/Price.service";
import { dialogService } from "@services/Dialog.service";
import { feedBackService } from "@services/FeedBack.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useModalBoxStore } from "@stores/modalbox.store";
import { UseMutationResult } from "@tanstack/react-query";
import Globals from "@utils/Globals";
import { mutationOptionsForConfigForms } from "@utils/mutation.options";
import { useFormik } from "formik";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export function PriceFormViewModel() {
  // Distinct creation and update form
  const { id } = useParams();
  const isUpdate = id !== undefined;

  const [searchParams] = useSearchParams();
  const skip = Number(searchParams.get("skip")) || 0;
  //Handle navigation
  const navigate = useNavigate();
  const listPath =
    Globals.configTypes.find((config) => config.scope === 9)?.path || "";
  const listPathWithSkip = `${listPath}?skip=${skip}`;

  //Handle dialogs
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();

  // Select states, initialization and data fetching
  const types = Globals.priceTypes;

  // Mutation functions and values initialization
  let isPending;
  let isError;
  let isPendingOnMutation;
  let isErrorOnMutation;
  let errorOnMutation;
  let mutationCreate: UseMutationResult<PriceResponse, any, Price>;
  let mutationUpdate: UseMutationResult<
    PriceResponse,
    any,
    {
      id: string;
      newPrice: Partial<Price>;
    }
  >;
  let mutationDelete: UseMutationResult<DeleteResponse, any, string>;
  let initialValues = {
    name: "",
    type: types[0].id,
    value: 0,
    description: "",
  };

  // Mutation assignation depending on isUpdate + existing datas fetching and adding to update Form
  if (isUpdate) {
    mutationUpdate = priceService.updatePrice();
    isPendingOnMutation = mutationUpdate.isPending;
    isErrorOnMutation = mutationUpdate.isError;
    errorOnMutation = mutationUpdate.error;

    mutationDelete = priceService.deletePrice();

    const {
      data,
      isError: isErrorPrice,
      isPending: isPendingPrice,
    } = priceService.getPriceById(id);
    isPending = isPendingPrice;
    isError = isErrorPrice;
    if (!isPending && !isError && data) {
      initialValues = { ...initialValues, ...data.datas };
    }
  } else {
    mutationCreate = priceService.createPrice();
    isPendingOnMutation = mutationCreate.isPending;
    isErrorOnMutation = mutationCreate.isError;
    errorOnMutation = mutationCreate.error;
  }

  // Formik setup
  const { handleSubmit, handleChange, errors, values, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: PriceSchema,
      enableReinitialize: true,
      onSubmit: () => {
        const updatedValues = { ...values, value: Number(values.value) };
        if (isUpdate) {
          mutationUpdate.mutate(
            { id, newPrice: updatedValues },
            mutationOptionsForConfigForms(
              showDialogBox,
              hideDialogBox,
              navigate,
              listPathWithSkip
            )
          );
        } else {
          mutationCreate.mutate(
            updatedValues,
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
    types,
    setFieldValue,
    isPending,
    isError,
    isPendingOnMutation,
    isErrorOnMutation,
    errorOnMutation,
  };
}

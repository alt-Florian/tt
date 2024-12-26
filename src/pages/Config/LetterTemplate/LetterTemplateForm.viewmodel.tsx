import { FeedBackBox } from "@components/feedBack/FeedBackBox";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import {
  LetterTemplate,
  LetterTemplateResponse,
} from "@interfaces/config/LetterTemplate.interface";
import { LetterTemplateSchema } from "@schemas/config/LetterTemplate.schema";
import { bankDetailService } from "@services/config/BankDetail.service";
import { letterTemplateService } from "@services/config/LetterTemplate.service";
import { dialogService } from "@services/Dialog.service";
import { feedBackService } from "@services/FeedBack.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useModalBoxStore } from "@stores/modalbox.store";
import { UseMutationResult } from "@tanstack/react-query";
import Globals from "@utils/Globals";
import { mutationOptionsForConfigForms } from "@utils/mutation.options";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export function LetterTemplateFormViewModel() {
  // Distinct creation and update form
  const { id } = useParams();
  const isUpdate = id !== undefined;

  const [searchParams] = useSearchParams();
  const skip = Number(searchParams.get("skip")) || 0;

  //Handle navigation
  const navigate = useNavigate();
  const listPath =
    Globals.configTypes.find((config) => config.scope === 6)?.path || "";
  const listPathWithSkip = `${listPath}?skip=${skip}`;

  //Handle dialogs
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();

  // Select states, initialization and data fetching
  const types = Globals.letterTemplateTypes;

  const {
    data,
    isPending: isPendingBankDetail,
    isError: isErrorBankDetail,
  } = bankDetailService.getAllBankDetails();
  const bankDetails =
    data?.datas?.map((bankDetail) => {
      return { id: bankDetail._id, name: bankDetail.name };
    }) ?? [];

  // Mutation functions and values initialization
  let isPending = isPendingBankDetail;
  let isError = isErrorBankDetail;
  let isPendingOnMutation;
  let isErrorOnMutation;
  let errorOnMutation;
  let mutationCreate: UseMutationResult<
    LetterTemplateResponse,
    any,
    LetterTemplate
  >;
  let mutationUpdate: UseMutationResult<
    LetterTemplateResponse,
    any,
    {
      id: string;
      newLetterTemplate: Partial<LetterTemplate>;
    }
  >;
  let mutationDelete: UseMutationResult<DeleteResponse, any, string>;
  let initialValues = {
    content: "",
    type: types[0].id,
    name: "",
    bankDetails: "",
  };

  // Mutation assignation depending on isUpdate + existing datas fetching and adding to update Form
  if (isUpdate) {
    mutationUpdate = letterTemplateService.updateLetterTemplate();
    isPendingOnMutation = mutationUpdate.isPending;
    isErrorOnMutation = mutationUpdate.isError;
    errorOnMutation = mutationUpdate.error;

    mutationDelete = letterTemplateService.deleteLetterTemplate();
    const {
      data: template,
      isPending: isPendingTemplate,
      isError: isErrorTemplate,
    } = letterTemplateService.getLetterTemplateById(id);

    isPending = isPending || isPendingTemplate;
    isError = isError || isErrorTemplate;

    if (!isPending && !isError && template) {
      const { content, type, name, bankDetails } = template.datas;
      if (content !== undefined) initialValues.content = content;
      if (type !== undefined) initialValues.type = type;
      if (name !== undefined) initialValues.name = name;
      if (bankDetails !== undefined)
        initialValues.bankDetails = bankDetails._id;
    }
  } else {
    mutationCreate = letterTemplateService.createLetterTemplate();
    isPendingOnMutation = mutationCreate.isPending;
    isErrorOnMutation = mutationCreate.isError;
    errorOnMutation = mutationCreate.error;
  }

  // Formik setup
  const { handleSubmit, handleChange, errors, values, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: LetterTemplateSchema,
      enableReinitialize: true, // allows refresh update form whith datas when fetched
      onSubmit: () => {
        if (isUpdate) {
          // Update actions
          mutationUpdate.mutate(
            { id, newLetterTemplate: values },
            mutationOptionsForConfigForms(
              showDialogBox,
              hideDialogBox,
              navigate,
              listPathWithSkip
            )
          );
        } else {
          // Create actions
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

  // Définir l'id du premier type comme valeur par défaut
  useEffect(() => {
    if (bankDetails.length > 0 && !values.bankDetails) {
      setFieldValue("bankDetails", bankDetails[0].id);
    }
  }, [bankDetails, values.bankDetails, setFieldValue]);

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
    setFieldValue,
    errors,
    touched,
    values,
    isUpdate,
    id,
    openConfirmDeleteModal,
    navigate,
    listPathWithSkip,
    types,
    bankDetails,
    isPending,
    isError,
    isPendingOnMutation,
    isErrorOnMutation,
    errorOnMutation,
  };
}

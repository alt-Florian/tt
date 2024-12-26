import { FeedBackBox } from "@components/feedBack/FeedBackBox";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import { Nature, NatureResponse } from "@interfaces/config/Nature.interface";
import { NatureSchema } from "@schemas/config/Nature.schema";
import { letterTemplateService } from "@services/config/LetterTemplate.service";
import { natureService } from "@services/config/Nature.service";
import { dialogService } from "@services/Dialog.service";
import { feedBackService } from "@services/FeedBack.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useModalBoxStore } from "@stores/modalbox.store";
import { UseMutationResult } from "@tanstack/react-query";
import Globals from "@utils/Globals";
import { mutationOptionsForConfigForms } from "@utils/mutation.options";
import { useFormik } from "formik";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export function NatureFormViewModel() {
  // Distinct creation and update form
  const { id } = useParams();
  const isUpdate = id !== undefined;

  const [searchParams] = useSearchParams();
  const skip = Number(searchParams.get("skip")) || 0;

  //Handle navigation
  const navigate = useNavigate();
  const listPath =
    Globals.configTypes.find((config) => config.scope === 8)?.path || "";
  const listPathWithSkip = `${listPath}?skip=${skip}`;

  //Handle dialogs
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();

  // Select initialization and data fetching

  const {
    data,
    isPending: isPendingLetterTemplate,
    isError: isErrorLetterTemplate,
  } = letterTemplateService.getAllLetterTemplates();

  const letterTemplates =
    data?.datas?.map((letterTemplate) => {
      return { id: letterTemplate._id, name: letterTemplate.name };
    }) ?? [];

  // Mutation functions and values initialization
  let isPending = isPendingLetterTemplate;
  let isError = isErrorLetterTemplate;
  let isPendingOnMutation;
  let isErrorOnMutation;
  let errorOnMutation;
  let mutationCreate: UseMutationResult<NatureResponse, any, Nature>;
  let mutationUpdate: UseMutationResult<
    NatureResponse,
    any,
    {
      id: string;
      newNature: Partial<Nature>;
    }
  >;
  let mutationDelete: UseMutationResult<DeleteResponse, any, string>;
  let initialValues = {
    name: "",
    alertDelay: 0,
    templates: [] as string[],
    description: "",
  };

  // Mutation assignation depending on isUpdate + existing datas fetching and adding to update Form
  if (isUpdate) {
    mutationUpdate = natureService.updateNature();
    isPendingOnMutation = mutationUpdate.isPending;
    isErrorOnMutation = mutationUpdate.isError;
    errorOnMutation = mutationUpdate.error;

    mutationDelete = natureService.deleteNature();

    const {
      data: nature,
      isPending: isPendingNature,
      isError: isErrorNature,
    } = natureService.getNatureById(id);
    isPending = isPending || isPendingNature;
    isError = isError || isErrorNature;

    if (!isPendingNature && !isErrorNature) {
      const { name, templates, alertDelay, description } = nature.datas;
      if (name !== undefined) initialValues.name = name;
      if (alertDelay !== undefined) initialValues.alertDelay = alertDelay;
      if (templates !== undefined)
        initialValues.templates = templates.map((template) => template._id);
      if (description !== undefined) initialValues.description = description;
    }
  } else {
    mutationCreate = natureService.createNature();
    isPendingOnMutation = mutationCreate.isPending;
    isErrorOnMutation = mutationCreate.isError;
    errorOnMutation = mutationCreate.error;
  }

  // Formik setup
  const { handleSubmit, handleChange, errors, values, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: NatureSchema,
      enableReinitialize: true, // allows refresh update form whith datas when fetched
      onSubmit: () => {
        const updatedValues = {
          ...values,
          alertDelay: Number(values.alertDelay),
        };
        if (isUpdate) {
          // Update actions
          mutationUpdate.mutate(
            { id, newNature: updatedValues },
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
    setFieldValue,
    errors,
    touched,
    values,
    isUpdate,
    id,
    openConfirmDeleteModal,
    navigate,
    listPathWithSkip,
    letterTemplates,
    isPending,
    isError,
    isPendingOnMutation,
    isErrorOnMutation,
    errorOnMutation,
  };
}

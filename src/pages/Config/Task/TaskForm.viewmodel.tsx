import { FeedBackBox } from "@components/feedBack/FeedBackBox";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import { Task, TaskResponse } from "@interfaces/config/Task.interface";
import { TaskSchema } from "@schemas/config/Task.schema";
import { taskService } from "@services/config/Task.service";
import { dialogService } from "@services/Dialog.service";
import { feedBackService } from "@services/FeedBack.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useModalBoxStore } from "@stores/modalbox.store";
import { UseMutationResult } from "@tanstack/react-query";
import Globals from "@utils/Globals";
import { mutationOptionsForConfigForms } from "@utils/mutation.options";
import { useFormik } from "formik";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export function TaskFormViewModel() {
  // Distinct creation and update form
  const { id } = useParams();
  const isUpdate = id !== undefined;

  const [searchParams] = useSearchParams();
  const skip = Number(searchParams.get("skip")) || 0;

  //Handle navigation
  const navigate = useNavigate();
  const listPath =
    Globals.configTypes.find((config) => config.scope === 11)?.path || "";
  const listPathWithSkip = `${listPath}?skip=${skip}`;

  //Handle dialogs
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();

  // Get datas for selects
  const types = Globals.taskTypes;
  const priorityAffectations = Globals.roles;

  // Mutation functions and values initialization
  let isPending;
  let isError;
  let isPendingOnMutation;
  let mutationCreate: UseMutationResult<TaskResponse, any, Task>;
  let mutationUpdate: UseMutationResult<
    TaskResponse,
    any,
    {
      id: string;
      newTask: Partial<Task>;
    }
  >;
  let mutationDelete: UseMutationResult<DeleteResponse, any, string>;
  let initialValues = {
    name: "",
    type: null as number | null,
    priorityAffectation: null as number | null,
    estimationTime: "",
  };

  // Mutation assignation depending on isUpdate + existing datas fetching and adding to update Form
  if (isUpdate) {
    mutationUpdate = taskService.updateTask();
    isPendingOnMutation = mutationUpdate.isPending;

    mutationDelete = taskService.deleteTask();

    const queryTask = taskService.getTaskById(id);
    const data = queryTask.data;
    const isPending = queryTask.isPending;
    const isError = queryTask.isError;
    if (!isPending && !isError && data) {
      initialValues = { ...initialValues, ...data.datas };
    }
  } else {
    mutationCreate = taskService.createTask();
    isPendingOnMutation = mutationCreate.isPending;
  }

  // Formik setup
  const { handleSubmit, handleChange, errors, values, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: TaskSchema,
      enableReinitialize: true, // allows refresh update form whith datas when fetched
      onSubmit: () => {
        if (isUpdate) {
          // Update actions
          const updatedValues = {
            ...values,
            type:
              values.type === null || values.type === undefined
                ? null
                : values.type,
            priorityAffectation:
              values.priorityAffectation === null ||
              values.priorityAffectation === undefined
                ? null
                : values.priorityAffectation,
          };
          mutationUpdate.mutate(
            { id, newTask: updatedValues },
            mutationOptionsForConfigForms(
              showDialogBox,
              hideDialogBox,
              navigate,
              listPathWithSkip
            )
          );
        } else {
          // Create actions
          const updatedValues = {
            ...values,
            type: values.type === null ? null : values.type,
          };
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
    types,
    priorityAffectations,
    isPending,
    isError,
    isPendingOnMutation,
  };
}

import { FeedBackBox } from "@components/feedBack/FeedBackBox";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  Block,
  BlockCreateResponse,
  BlockUpdateResponse,
} from "@interfaces/config/Block.interface";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import { BlockSchema } from "@schemas/config/Block.schema";
import { blockService } from "@services/config/Block.service";
import { natureService } from "@services/config/Nature.service";
import { priceService } from "@services/config/Price.service";
import { taskService } from "@services/config/Task.service";
import { dialogService } from "@services/Dialog.service";
import { feedBackService } from "@services/FeedBack.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useModalBoxStore } from "@stores/modalbox.store";
import { UseMutationResult } from "@tanstack/react-query";
import Globals from "@utils/Globals";
import { mutationOptionsForConfigForms } from "@utils/mutation.options";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export function BlockFormViewModel() {
  // Distinct creation and update form
  const { id } = useParams();
  const isUpdate = id !== undefined;

  const [searchParams] = useSearchParams();
  const skip = Number(searchParams.get("skip")) || 0;

  //Handle navigation
  const navigate = useNavigate();
  const listPath =
    Globals.configTypes.find((config) => config.scope === 7)?.path || "";
  const listPathWithSkip = `${listPath}?skip=${skip}`;

  //Handle dialogs
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();

  //State for tasks-list Select
  const [selectedTaskToAdd, setselectedTaskToAdd] = useState<string>("");
  // State for sortable list with drag and drop library
  const [sortableTasks, setSortableTasks] = useState<
    {
      id: number;
      text: string;
    }[]
  >([]);

  // Fetching select options
  const {
    data: naturesData,
    isPending: isPendingNatures,
    isError: isErrorNatures,
  } = natureService.getAllNatures();

  const natures =
    naturesData?.datas?.map((nature) => {
      return { id: nature._id, name: nature.name };
    }) ?? [];

  const {
    data: pricesData,
    isPending: isPendingPrices,
    isError: isErrorPrices,
  } = priceService.getAllPrices();

  const prices =
    pricesData?.datas?.map((price) => {
      return { id: price._id, name: price.name };
    }) ?? [];

  const {
    data: tasksData,
    isPending: isPendingTasks,
    isError: isErrorTasks,
  } = taskService.getAllTasks();

  const tasksList =
    tasksData?.datas?.map((task) => {
      return { id: task._id, name: task.name };
    }) ?? [];

  let isPending = isPendingNatures || isPendingPrices || isPendingTasks;
  let isError = isErrorNatures || isErrorPrices || isErrorTasks;

  // Mutation functions and values initialization
  let isPendingOnMutation;
  let isErrorOnMutation;
  let errorOnMutation;
  let mutationCreate: UseMutationResult<BlockCreateResponse, any, Block>;
  let mutationUpdate: UseMutationResult<
    BlockUpdateResponse,
    any,
    {
      id: string;
      newBlock: Partial<Block>;
    }
  >;
  let mutationDelete: UseMutationResult<DeleteResponse, any, string>;
  let initialValues = {
    name: "",
    description: "",
    natures: [] as string[],
    prices: [] as string[],
    tasks: [] as string[],
  };

  // Mutation setup depending on isUpdate + Datas fetching for updateForm
  if (isUpdate) {
    mutationUpdate = blockService.updateBlock();
    isPendingOnMutation = mutationUpdate.isPending;
    isErrorOnMutation = mutationUpdate.isError;
    errorOnMutation = mutationUpdate.error;

    mutationDelete = blockService.deleteBlock();
    const {
      data: blockData,
      isPending: isPendingBlock,
      isError: isErrorBlock,
    } = blockService.getBlockById(id);

    isPending = isPending || isPendingBlock;

    if (!isPendingBlock && !isErrorBlock) {
      const { name, description, natures, prices, tasks } = blockData.datas;

      if (name !== undefined) {
        initialValues.name = name;
      }
      if (description !== undefined) {
        initialValues.description = description;
      }
      if (natures !== undefined) {
        initialValues.natures = natures.map((nature) => nature._id);
      }
      if (prices !== undefined) {
        initialValues.prices = prices.map((price) => price._id);
      }
      if (tasks !== undefined) {
        initialValues.tasks = tasks.map((task) => task._id);
      }
    }
  } else {
    mutationCreate = blockService.createBlock();
    isPendingOnMutation = mutationCreate.isPending;
    isErrorOnMutation = mutationCreate.isError;
    errorOnMutation = mutationCreate.error;
  }

  // Formik setup
  const { handleSubmit, handleChange, errors, values, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: BlockSchema,
      enableReinitialize: true, // allows refresh update-form whith datas when fetched
      onSubmit: (values) => {
        if (isUpdate) {
          // Update actions
          mutationUpdate.mutate(
            {
              id,
              newBlock: {
                ...values,
                tasks: sortableTasks.map((task) => task.text),
              },
            },
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
            {
              ...values,
              tasks: sortableTasks.map((task) => task.text),
            },
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

  // On first render in update forms, initialize sortableTasks with registered tasks
  useEffect(() => {
    const initialTasksForDnD = values.tasks.map((taskId, index) => ({
      id: index,
      text: taskId,
    }));
    setSortableTasks(initialTasksForDnD);
  }, [values.tasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sortableTasks.findIndex((task) => {
        return task.id === active.id;
      });
      const newIndex = sortableTasks.findIndex((task) => task.id === over?.id);
      const updatedSortableTasks = arrayMove(sortableTasks, oldIndex, newIndex);
      setSortableTasks(updatedSortableTasks);
    }
  };

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
    natures,
    prices,
    tasksList,
    isPending,
    isError,
    selectedTaskToAdd,
    setselectedTaskToAdd,
    sortableTasks,
    setSortableTasks,
    handleDragEnd,
    isPendingOnMutation,
    isErrorOnMutation,
    errorOnMutation,
  };
}

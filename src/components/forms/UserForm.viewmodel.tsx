import {
  UserInterface,
  UserResponse,
  UserWithoutPasswordInterface,
} from "@interfaces/user/User.interface";
import { SignUpSchema } from "@schemas/auth/SignUp.schema";
import { UserSchema } from "@schemas/user/User.schema";
import { authService } from "@services/Auth.service";
import { dialogService } from "@services/Dialog.service";
import { userService } from "@services/User.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export function UserFormViewModel(handleClose: () => void, id?: number) {
  const navigate = useNavigate();
  const isUpdate = id !== undefined;

  const queryClient = useQueryClient();

  const status = [
    { id: true, name: "Actif" },
    { id: false, name: "Inactif" },
  ];

  const { showDialogBox, hideDialogBox } = useDialogBoxStore();

  // Mutation functions and values initialization
  let mutationCreate: UseMutationResult<UserResponse, any, UserInterface>;
  let mutationUpdate: UseMutationResult<
    UserResponse,
    any,
    {
      id: number;
      newUser: Partial<UserInterface>;
    }
  >;

  let initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    role: 1,
    isActive: true,
    password: "",
  };

  // Mutation assignation depending on isUpdate + existing datas fetching and adding to update Form
  let isPending;
  let isError;

  let errorOnMutation;
  let isErrorOnMutation;
  let isPendingOnMutation;

  if (id !== undefined) {
    mutationUpdate = userService.updateUser();
    errorOnMutation = mutationUpdate.error;
    isErrorOnMutation = mutationUpdate.isError;
    isPendingOnMutation = mutationUpdate.isPending;

    const queryUser = userService.getUserById(id);
    const data = queryUser.data;
    isError = queryUser.isError;
    isPending = queryUser.isPending;
    if (!isPending && !isError && data) {
      initialValues = { ...initialValues, ...data.datas };
    }
  } else {
    mutationCreate = authService.signUp();
    errorOnMutation = mutationCreate.error;
    isErrorOnMutation = mutationCreate.isError;
    isPendingOnMutation = mutationCreate.isPending;
  }

  // Formik setup
  const { handleSubmit, handleChange, errors, values, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: isUpdate ? UserSchema : SignUpSchema,
      enableReinitialize: true,
      onSubmit: () => {
        // remove password key from values if empty
        if (isUpdate) {
          let updatedValues: UserWithoutPasswordInterface | UserInterface;
          if (values.password) {
            updatedValues = values;
          } else {
            const { password, ...rest } = values;
            updatedValues = rest;
          }
          // update user
          mutationUpdate.mutate(
            { id, newUser: updatedValues },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["users"] });
                showDialogBox({
                  ...dialogService.successMessage(),
                  onClick: () => {
                    hideDialogBox();
                  },
                });
                handleClose();
              },
              onError: (error) => {
                console.log(error);
                if (error.status !== 409) {
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
          mutationCreate.mutate(values, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["users"] });
              showDialogBox({
                ...dialogService.successMessage(),
                onClick: () => {
                  hideDialogBox();
                },
              });
              handleClose();
            },
            onError: (error) => {
              console.log(error);
              if (error.status !== 409) {
                showDialogBox({
                  ...dialogService.errorMessage(),
                  onClick: () => {
                    hideDialogBox();
                  },
                });
                handleClose();
              }
            },
          });
        }
      },
    });

  return {
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
    setFieldValue,
    navigate,
    status,
    isUpdate,
    isPending,
    isError,
    isErrorOnMutation,
    isPendingOnMutation,
    errorOnMutation,
  };
}

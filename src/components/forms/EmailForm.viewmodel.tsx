import { EmailSchema } from "@schemas/customer/Email.schema";
import { customerService } from "@services/customer/Customer.service";
import { dialogService } from "@services/Dialog.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";

export function EmailFormViewModel(handleClose: () => void, id: string) {
  const queryClient = useQueryClient();
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();

  //Become Customer Mutation & function
  const { mutate, isPending, isError, error } =
    customerService.becomeCustomer();

  let initialValues = {
    email: "",
  };

  const { handleSubmit, handleChange, errors, values, touched } = useFormik({
    initialValues,
    validationSchema: EmailSchema,
    onSubmit: () => {
      mutate(
        { id, body: { email1: values.email } },
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
          onError: (error: any) => {
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
    },
  });

  return {
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
    isPending,
    isError,
    error,
  };
}

import { RefIdSchema } from "@schemas/customer/RefIdSchema";
import { customerService } from "@services/customer/Customer.service";
import { dialogService } from "@services/Dialog.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";

export function RefIdFormViewModel(handleClose: () => void, id: string) {
  const queryClient = useQueryClient();
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();

  let initialValues = {
    refId: "",
  };

  const { data, isPending, isError } =
    customerService.getAllCustomersForSelect();

  let customersList: { id: string; name: string }[] = [];
  if (!isPending && !isError) {
    customersList = data.datas.map((customer) => ({
      id: customer._id,
      name: `${customer.row_infos.firstname} ${customer.name}`,
    }));
  }

  //Become Customer Mutation & function
  const {
    mutate,
    isPending: isPendingOnMutation,
    isError: isErrorOnMutation,
    error: errorOnMutation,
  } = customerService.becomeCustomer();

  const { handleSubmit, handleChange, errors, values, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: RefIdSchema,
      enableReinitialize: true,
      onSubmit: (values, { setErrors }) => {
        console.log("submit", values);
        if (values.refId === "") {
          setErrors({
            refId: "Veuillez sélectionner une personne de référence",
          });
        } else {
          mutate(
            { id, body: { refId: values.refId } },
            {
              onSuccess: () => {
                console.log("success");
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
              onError: (error: any) => {
                console.log(error);
                showDialogBox({
                  ...dialogService.errorMessage(),
                  onClick: () => {
                    hideDialogBox();
                  },
                });
                handleClose();
              },
            }
          );
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
    isPending,
    isError,
    isPendingOnMutation,
    isErrorOnMutation,
    errorOnMutation,
    customersList,
  };
}

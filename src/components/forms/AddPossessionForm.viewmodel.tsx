import { PossessionSchema } from "@schemas/customer/Possession.schema";
import { dialogService } from "@services/Dialog.service";
import { possessionService } from "@services/customer/Possession.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useQueryClient } from "@tanstack/react-query";
import Globals from "@utils/Globals";
import { useFormik } from "formik";
import { useState } from "react";

export default function AddPossessionFormViewModel({
  isActive,
  customerId,
  handleClose,
}: {
  isActive: boolean;
  customerId: string;
  handleClose: () => void;
}) {
  const queryClient = useQueryClient();

  //DialogBox and MOdalBox handling
  const [isActiveForm, setIsActiveForm] = useState(isActive);
  const { hideDialogBox, showDialogBox } = useDialogBoxStore();
  const { mutate: mutateCreate } = possessionService.createPossession();

  //Form handling
  const { handleSubmit, handleChange, errors, values, touched, setFieldValue } =
    useFormik({
      initialValues: { name: "", value: "", category: 1 },
      validationSchema: PossessionSchema,
      onSubmit: () => {
        const updatedValues = {
          type: isActiveForm ? "1" : "2",
          name: values.name,
          category: values.category,
          value: Number(values.value),
        };
        mutateCreate(
          { customerId, possession: updatedValues },
          {
            onSuccess: () => {
              showDialogBox({
                ...dialogService.successMessage(),
                onClick: () => {
                  hideDialogBox();
                },
              });
              queryClient.invalidateQueries({
                queryKey: [`possession${customerId}`],
              });
              queryClient.invalidateQueries({
                queryKey: [`physicalCustomerProfile${customerId}`],
              });
              queryClient.invalidateQueries({
                queryKey: [`corporateCustomerProfile${customerId}`],
              });
              handleClose();
            },
            onError: (error) => {
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
      },
    });

  //Get categories lists for select
  const activeCategories = Globals.catActive.map((cat) => ({
    id: cat.value,
    name: cat.text,
  }));
  const passiveCategories = Globals.catPassive.map((cat) => ({
    id: cat.value,
    name: cat.text,
  }));

  return {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    setFieldValue,
    activeCategories,
    passiveCategories,
    isActiveForm,
    setIsActiveForm,
  };
}

//import { UserInterface } from "@interfaces/user/User.interface";
import { UserSchema } from "@schemas/user/User.schema";
import { dialogService } from "@services/Dialog.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useFormik } from "formik";

export function UserAddViewModel() {
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();

  const { handleSubmit, handleChange, errors, values, touched } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      address: "",
    },
    validationSchema: UserSchema,
    onSubmit: (/* values: Omit<UserInterface, "role" | "isActive" | "password"> */) => {
      showDialogBox({
        ...dialogService.successMessage(),
        onClick: hideDialogBox,
      });
    },
  });

  return {
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
  };
}

import { CustomerAddFormProps } from "@components/forms/CustomerForm";
import { CorporateContactCreate } from "@interfaces/customer/CorporateContact.interface";
import {
  CorporateContactSchema,
  CorporateCustomerSchema,
  PhysicalContactSchema,
  PhysicalCustomerSchema,
} from "@schemas/customer/Customer.schema";
import { customerService } from "@services/customer/Customer.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import Globals from "@utils/Globals";
import { mutationOptionsForCustomerForm } from "@utils/mutation.options";
import { useFormik } from "formik";
import { useState } from "react";

export function CustomerFormViewModel({
  isCustomer,
  handleClose,
}: CustomerAddFormProps) {
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();

  const [isPhysical, setIsPhysical] = useState(true);
  const [isPappers, setIsPappers] = useState(false);
  const isCorporate = !isPhysical;
  const isContact = !isCustomer;

  const civilities = Globals.civilities.map(({ value, name }) => ({
    name: name,
    value: value.toString(),
  }));

  const rSocials = Globals.rSocials.map(({ value, text }) => ({
    id: value,
    name: text,
  }));

  const initialValues = {
    civilities: 1,
    name: "",
    firstname: "",
    email: "",
    phone1: "",
    rSocial: 19,
    siren: "" as number | string,
    refId: "",
  };

  const {
    data,
    isPending: isPendingCustomersForSelect,
    isError: isErrorCustomersForSelect,
  } = customerService.getAllCustomersForSelect();

  let customersList = [{ id: "", name: "--------" }];

  if (!isPendingCustomersForSelect && !isErrorCustomersForSelect) {
    customersList = [
      ...customersList,
      ...data.datas.map((customer) => ({
        id: customer._id,
        name: `${customer.row_infos.firstname} ${customer.name}`,
      })),
    ];
    initialValues.refId = customersList[1].id;
    if (isContact) {
      initialValues.refId = customersList[0].id;
    }
  }

  const mutationPhysicalCustomer = customerService.createPhysicalCustomer();
  const mutationPhysicalContact = customerService.createPhysicalContact();
  const mutationCorporateCustomer = customerService.createCorporateCustomer();
  const mutationCorporateContact = customerService.createCorporateContact();
  const mutationCorporateCustomerWithPappers =
    customerService.createCorporateCustomerWithPappers();
  const mutationCorporateContactWithPappers =
    customerService.createCorporateContactWithPappers();

  const {
    isPending: isPendingOnPhysicalCustomer,
    isError: isErrorOnPhysicalCustomer,
    error: errorOnPhysicalCustomer,
  } = mutationPhysicalCustomer;
  const {
    isPending: isPendingOnPhysicalContact,
    isError: isErrorOnPhysicalContact,
    error: errorOnPhysicalContact,
  } = mutationPhysicalContact;
  const {
    isPending: isPendingOnCorporateCustomer,
    isError: isErrorOnCorporateCustomer,
    error: errorOnCorporateCustomer,
  } = mutationCorporateCustomer;
  const {
    isPending: isPendingOnCorporateContact,
    isError: isErrorOnCorporateContact,
    error: errorOnCorporateContact,
  } = mutationCorporateContact;
  const {
    isPending: isPendingOnCorporateCustomerWithPappers,
    isError: isErrorOnCorporateCustomerWithPappers,
    error: errorOnCorporateCustomerWithPappers,
  } = mutationCorporateCustomerWithPappers;
  const {
    isPending: isPendingOnCorporateContactWithPappers,
    isError: isErrorOnCorporateContactWithPappers,
    error: errorOnCorporateContactWithPappers,
  } = mutationCorporateContactWithPappers;

  const formik = useFormik({
    initialValues,
    validationSchema: isPhysical
      ? isCustomer
        ? PhysicalCustomerSchema
        : PhysicalContactSchema
      : isCustomer
      ? CorporateCustomerSchema
      : CorporateContactSchema,
    enableReinitialize: true,
    onSubmit: () => {
      // Create physical customer
      if (isPhysical) {
        const updatedValues = {
          name: values.name,
          email1: values.email,
          customer: isCustomer,
          row_infos: {
            firstname: values.firstname,
            civilities: values.civilities,
            phone1: values.phone1,
          },
        };
        if (isCustomer) {
          mutationPhysicalCustomer.mutate(
            updatedValues,
            mutationOptionsForCustomerForm(
              handleClose,
              showDialogBox,
              hideDialogBox
            )
          );
        } else {
          mutationPhysicalContact.mutate(
            updatedValues,
            mutationOptionsForCustomerForm(
              handleClose,
              showDialogBox,
              hideDialogBox
            )
          );
        }
      } else {
        // Create corporate customer with Pappers
        if (isPappers) {
          const updatedValues = {
            body: { customer: isCustomer, refId: values.refId },
            siren: values.siren.toString(),
          };
          if (isCustomer) {
            mutationCorporateCustomerWithPappers.mutate(
              updatedValues,
              mutationOptionsForCustomerForm(
                handleClose,
                showDialogBox,
                hideDialogBox
              )
            );
          } else {
            mutationCorporateContactWithPappers.mutate(
              updatedValues,
              mutationOptionsForCustomerForm(
                handleClose,
                showDialogBox,
                hideDialogBox
              )
            );
          }
        }
        //Create corporate customer without Pappers
        else {
          if (isCustomer) {
            const updatedValues = {
              name: values.name,
              refId: values.refId,
              customer: isCustomer,
              row_infos: {
                rSocial: values.rSocial,
                siren: Number(values.siren),
                phone1: values.phone1,
              },
              email1: values.email,
            };
            mutationCorporateCustomer.mutate(
              updatedValues,
              mutationOptionsForCustomerForm(
                handleClose,
                showDialogBox,
                hideDialogBox
              )
            );
          } else {
            const updatedValues: CorporateContactCreate = {
              name: values.name,
              customer: isCustomer,
              row_infos: {
                rSocial: values.rSocial,
                siren: Number(values.siren),
                phone1: values.phone1,
              },
              email1: values.email,
            };
            if (values.refId !== "") {
              updatedValues.refId = values.refId;
            }
            mutationCorporateContact.mutate(
              updatedValues,
              mutationOptionsForCustomerForm(
                handleClose,
                showDialogBox,
                hideDialogBox
              )
            );
          }
        }
      }
    },
  });

  const { handleSubmit, handleChange, errors, values, touched, setFieldValue } =
    formik;

  return {
    formik,
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    setFieldValue,
    isPhysical,
    setIsPhysical,
    isContact,
    isCorporate,
    isPappers,
    setIsPappers,
    customersList,
    civilities,
    rSocials,
    isPendingOnPhysicalCustomer,
    isErrorOnPhysicalCustomer,
    errorOnPhysicalCustomer,
    isPendingOnPhysicalContact,
    isErrorOnPhysicalContact,
    errorOnPhysicalContact,
    isPendingOnCorporateCustomer,
    isErrorOnCorporateCustomer,
    errorOnCorporateCustomer,
    isPendingOnCorporateContact,
    isErrorOnCorporateContact,
    errorOnCorporateContact,
    isPendingOnCorporateCustomerWithPappers,
    isErrorOnCorporateCustomerWithPappers,
    errorOnCorporateCustomerWithPappers,
    isPendingOnCorporateContactWithPappers,
    isErrorOnCorporateContactWithPappers,
    errorOnCorporateContactWithPappers,
    isPendingCustomersForSelect,
    isErrorCustomersForSelect,
  };
}

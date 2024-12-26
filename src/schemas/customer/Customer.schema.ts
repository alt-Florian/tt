import { yup } from "@schemas/index.ts";

export const PhysicalCustomerSchema = yup.object({
  civilities: yup.number().required("Ce champ est obligatoire"),
  name: yup.string().required("Ce champ est obligatoire"),
  firstname: yup.string().required("Ce champ est obligatoire"),
  email: yup
    .string()
    .email("Le format d'email est incorrect")
    .required("Ce champ est obligatoire"),
  phone1: yup.string(),
});

export const PhysicalContactSchema = yup.object({
  civilities: yup.number().required("Ce champ est obligatoire"),
  name: yup.string().required("Ce champ est obligatoire"),
  firstname: yup.string().required("Ce champ est obligatoire"),
  email: yup.string().email("Le format d'email est incorrect"),
  phone1: yup.string(),
});

export const CorporateCustomerSchema = yup.object({
  rSocial: yup.number().required("Ce champ est obligatoire"),
  name: yup.string().required("Ce champ est obligatoire"),
  siren: yup
    .number()
    .typeError(
      "Le SIREN doit être un nombre compris entre 100000000 et 999999999"
    )
    .min(100000000, "Le SIREN doit être supérieur à 100000000")
    .max(999999999, "Le SIREN doit être inférieur à 999999999")
    .required("Ce champ est obligatoire"),
  refId: yup.string().required("Ce champ est obligatoire"),
});

export const CorporateContactSchema = yup.object({
  rSocial: yup.number().required("Ce champ est obligatoire"),
  name: yup.string().required("Ce champ est obligatoire"),
  siren: yup
    .number()
    .typeError(
      "Le SIREN doit être un nombre compris entre 100000000 et 999999999"
    )
    .min(100000000, "Le SIREN doit être supérieur à 100000000")
    .max(999999999, "Le SIREN doit être inférieur à 999999999")
    .required("Ce champ est obligatoire"),
  refId: yup.string(),
});

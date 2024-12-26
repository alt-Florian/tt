import { yup } from "@schemas/index";

export const LetterTemplateSchema = yup.object({
  name: yup.string().required("Ce champ est obligatoire"),
  type: yup
    .number()
    .required("Ce champ est obligatoire")
    .oneOf([1, 2, 3, 4, 5], "Choix invalide"),
  content: yup.string().required("Ce champ est obligatoire"),
  extras: yup.string(),
  bankDetails: yup.string().required("Ce champ est obligatoire"),
});

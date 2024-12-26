import { yup } from "@schemas/index";

export const BlockSchema = yup.object({
  name: yup.string().required("Ce champ est obligatoire"),
  description: yup.string().required("Ce champ est obligatoire"),
  natures: yup
    .array()
    .of(yup.string())
    .min(1, "Ce champ doit contenir au moins un élément")
    .required("Ce champ est obligatoire"),
  prices: yup
    .array()
    .of(yup.string())
    .min(1, "Ce champ doit contenir au moins un élément")
    .required("Ce champ est obligatoire"),
  tasks: yup.array().of(yup.string()),
});

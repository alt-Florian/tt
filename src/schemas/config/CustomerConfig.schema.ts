import { yup } from "@schemas/index";

export const CustomerConfigSchema = yup.object({
  name: yup.string().required("Ce champ est obligatoire"),
  colorCode: yup
    .string()
    .required("Ce champ est obligatoire")
    .matches(/^#([0-9A-Fa-f]{3}){1,2}$/, "Ce code couleur est invalide"),
});

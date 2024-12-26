import { yup } from "@schemas/index.ts";

export const PossessionSchema = yup.object({
  name: yup.string().required("Ce champ est obligatoire"),
  category: yup.number().required("Ce champ est obligatoire"),
  value: yup
    .number()
    .typeError("La valeur doit être un nombre")
    .min(1, "La valeur doit être supérieure à zéro")
    .required("Ce champ est obligatoire"),
});

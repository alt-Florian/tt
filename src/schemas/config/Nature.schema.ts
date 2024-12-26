import { yup } from "@schemas/index";

export const NatureSchema = yup.object({
  name: yup.string().required("Ce champ est obligatoire"),
  templates: yup
    .array()
    .of(yup.string())
    .min(1, "Ce champ doit contenir au moins un élément")
    .required("Ce champ est obligatoire"),
  alertDelay: yup
    .number()
    .typeError("La valeur doit être un nombre")
    .min(0, "La valeur ne doit pas être négative")
    .integer("La valeur doit être un nombre entier"),
  description: yup.string(),
});

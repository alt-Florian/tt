import { yup } from "@schemas/index.ts";

export const EmailSchema = yup.object({
  email: yup
    .string()
    .email("Le format d'email est incorrect")
    .required("Ce champ est obligatoire"),
});

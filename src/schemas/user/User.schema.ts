import { yup } from "@schemas/index.ts";

export const UserSchema = yup.object({
  firstname: yup.string().required("Ce champ est obligatoire"),
  lastname: yup.string().required("Ce champ est obligatoire"),
  email: yup
    .string()
    .required("Ce champ est obligatoire")
    .email("Email invalide"),
  password: yup.string(),
  role: yup.number().oneOf([0, 1, 2, 3, 4], "Choix invalide"),
  isActive: yup.bool(),
});

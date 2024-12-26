import { yup } from "@schemas/index.ts";

export const SignUpSchema = yup.object({
  firstname: yup.string().required("Ce champ est obligatoire"),
  lastname: yup.string().required("Ce champ est obligatoire"),
  email: yup.string().email().required("Ce champ est obligatoire"),
  password: yup.string().required("Ce champ est obligatoire"),
  role: yup.number().oneOf([0, 1, 2, 3, 4], "Choix invalide"),
  isActive: yup.bool(),
});

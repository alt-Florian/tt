import { yup } from "@schemas/index.ts";

export const SignInSchema = yup.object({
  email: yup.string().email("Adresse email invalide").required("Email requis"),
  password: yup.string().required("Mot de passe requis"),
});

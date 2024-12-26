import { yup } from "@schemas/index";

export const BankDetailSchema = yup.object({
  name: yup.string(),
  description: yup.string(),
  bank: yup.string().required("Ce champ est obligatoire"),
  bic: yup
    .string()
    .required("Ce champ est obligatoire")
    .matches(
      /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
      "Le BIC doit être composé ainsi : code banque (4 majuscules) code pays (2 majuscules) code localisation (2 majuscules ou chiffres) code facultatif (3 caractères)"
    ),
  iban: yup
    .string()
    .required("Ce champ est obligatoire")
    .matches(
      /^[A-Z]{2}\d{2}(\s?[A-Z0-9]{4}){3,6}(\s?[A-Z0-9]{1,3})?$/,
      "L'IBAN doit être composé ainsi : code pays (2 majuscules) clé de contrôle (2 chiffres) reste de l'IBAN (13 à 30 caractères)"
    ),
});

import { yup } from "@schemas/index.ts";

export const PatrimonyPhysicalSchema = yup.object({
  year: yup
    .string()
    .required("Ce champ est obligatoire")
    .matches(/^\d{4}$/, "Format d'année invalide"),
  fiscalTax: yup
    .number()
    .typeError("Le revenu fiscal doit être un nombre")
    .min(0, "Le revenu fiscal doit être supérieur à zéro"),
  payedTax: yup
    .number()
    .typeError("L'IR doit être un nombre")
    .min(0, "L'IR doit être supérieur à zéro"),
  socialTax: yup
    .number()
    .typeError("La CSG doit être un nombre")
    .min(0, "La CSG doit être supérieure à zéro"),
});

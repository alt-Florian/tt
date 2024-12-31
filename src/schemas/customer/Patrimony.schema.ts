import { yup } from "@schemas/index.ts";

export const PatrimonyPhysicalSchema = yup.object({
  year: yup
    .string()
    .required("Ce champ est obligatoire")
    .matches(/^\d{4}$/, "Format d'année invalide"),
  fiscalTax: yup.number().typeError("Le revenu fiscal doit être un nombre"),
  payedTax: yup.number().typeError("L'IR doit être un nombre"),
  socialTax: yup.number().typeError("La CSG doit être un nombre"),
});

export const PatrimonyCorporateSchema = yup.object({
  year: yup
    .string()
    .required("Ce champ est obligatoire")
    .matches(/^\d{4}$/, "Format d'année invalide"),
  equity: yup.number().typeError("Les capitaux propres doivent être un nombre"),
  ca: yup.number().typeError("Le chiffre d'affaire doit être un nombre"),
  netResult: yup.number().typeError("Le résultat net doit être un nombre"),
  netAsset: yup.number().typeError("L'actif net doit être un nombre"),
  effectif: yup.number().typeError("La CSG doit être un nombre"),
  VAT: yup.boolean().nullable(),
  corporateTax: yup.boolean().nullable(),
});

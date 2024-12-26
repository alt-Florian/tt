import { yup } from "@schemas/index";
export const PriceSchema = yup.object({
  name: yup.string().required("Ce champ est obligatoire"),
  type: yup
    .number()
    .required("Ce champ est obligatoire")
    .oneOf([1, 2, 3, 4, 5]),
  value: yup
    .number()
    .required("Ce champ est obligatoire")
    .typeError("La valeur doit être un nombre")
    .min(0, "La valeur ne doit pas être négative"),

  minFee: yup.number(),
  description: yup.string().required("Ce champ est obligatoire"),
});

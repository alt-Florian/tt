import { yup } from "@schemas/index.ts";

export const RefIdSchema = yup.object({
  refId: yup.string().required("Ce champ est obligatoire"),
});

import { yup } from "@schemas/index";

export const TaskSchema = yup.object({
  name: yup.string().required("Ce champ est obligatoire"),
  type: yup.number().oneOf([0, 1, 2], "Choix invalide").nullable(),
  priorityAffectation: yup
    .number()
    .oneOf([0, 1, 2, 3, 4], "Choix invalide")
    .nullable(),
  deadline: yup.number(),
  estimationTime: yup.string(),
});

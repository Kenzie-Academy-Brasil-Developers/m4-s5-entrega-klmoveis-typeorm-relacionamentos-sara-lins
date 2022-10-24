import * as yup from "yup";
import { v4 } from "uuid";

export const createPropertySerializer = yup.object().shape({
  value: yup.number().required(),
  size: yup.number().required(),
  address: yup
    .object()
    .shape({
      id: yup
        .string()
        .transform(() => v4())
        .default(() => v4())
        .notRequired(),
      district: yup.string(),
      zipCode: yup.string().required(),
      number: yup.string(),
      city: yup.string(),
      state: yup.string().required(),
    })
    .required(),
  categoryId: yup.string(),
  id: yup
    .string()
    .transform(() => v4())
    .default(() => v4())
    .notRequired(),
  sold: yup
    .boolean()
    .transform(() => false)
    .default(() => false)
    .notRequired(),
  createdAt: yup
    .date()
    .transform(() => new Date())
    .default(() => new Date())
    .notRequired(),
  updatedAt: yup
    .date()
    .transform(() => new Date())
    .default(() => new Date())
    .notRequired(),
});

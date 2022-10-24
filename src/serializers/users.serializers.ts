import * as yup from "yup";
import { v4 } from "uuid";
import { hashSync } from "bcrypt";

export const createUserSerializer = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  isAdm: yup.boolean().required(),
  isActive: yup.boolean().default(true).notRequired(),
  password: yup.string().transform((pwd) => hashSync(pwd, 10)),
  id: yup
    .string()
    .transform(() => v4())
    .default(() => v4())
    .notRequired(),
});

export const updateUserSerializer = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  password: yup
    .string()
    .transform((pwd) => hashSync(pwd, 10))
    .notRequired(),
});

export const loginUserSerializer = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

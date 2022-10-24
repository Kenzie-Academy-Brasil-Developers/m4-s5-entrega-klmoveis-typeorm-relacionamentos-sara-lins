import * as yup from "yup";
import { v4 } from "uuid";

export const categorySerializer = yup.object().shape({
  name: yup.string().required(),
  id: yup
    .string()
    .transform(() => v4())
    .default(() => v4())
    .notRequired(),
});

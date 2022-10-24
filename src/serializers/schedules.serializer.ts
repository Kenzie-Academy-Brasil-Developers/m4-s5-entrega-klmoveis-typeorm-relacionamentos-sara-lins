import * as yup from "yup";
import { v4 } from "uuid";

export const scheduleSerializer = yup.object().shape({
  id: yup
    .string()
    .transform(() => v4())
    .default(() => v4())
    .notRequired(),
  date: yup.string().required(),
  hour: yup.string().required(),
  propertyId: yup.string().required(),
});

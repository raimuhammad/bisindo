import { object, string } from "yup";

export const batchValidator = object({
  name: string().required(),
});

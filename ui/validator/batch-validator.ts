import { object, string } from "yup";

const messages = {
  name: {
    required: "Nama batch wajib di isi"
  }
};

export const batchValidator = object({
  name: string().required(messages.name.required)
});

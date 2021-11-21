import { object, string, mixed } from "yup";

const messages = {
  description: {
    required: "Silahkan isi konten diskusi",
  },
};

const parseJson = (value: any): Record<string, any> => {
  const obj = JSON.parse(value);
  if (typeof obj !== "object") {
    return parseJson(obj);
  }
  return obj;
};
const descriptionValidator = mixed().test(
  "description validator",
  messages.description.required,
  (json: any) => {
    try {
      if (json.blocks.length === 1) {
        return json.blocks[0].text !== "";
      }
      return json.blocks.length > 0;
    } catch (e) {
      return false;
    }
  }
);

export const discussionContentValidator = object({
  content: descriptionValidator.required(),
});

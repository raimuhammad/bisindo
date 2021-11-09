import { object, string, mixed } from "yup";
import { convertFromRaw, EditorState, RawDraftContentState } from "draft-js";


/***
 * Rubah pesan error
 */
const messages = {
  videos: {
    required: "Silahkan pilih video terlebih dahulu",
  },
  title: {
    required: "Wajib isi judul video",
  },
  caption: {
    required: "Silahkan isi caption video",
  },
  description: {
    required: "Silahkan isi deskripsi video",
  },
};










const fileValidator = mixed().test(
  "video",
  messages.videos.required,
  (v: any) => {
    return v && v instanceof File;
  }
);
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

export const videoValidator = object({
  content: fileValidator.required(messages.videos.required),
  title: string().required(messages.title.required),
  caption: string().required(messages.caption.required),
  description: descriptionValidator.required(),
});

import type { QuizType } from "@root/models";
import { MultipleChoiseValues, MultipleChoiseOption } from "./provider";

export function makeQuizProps(
  type: QuizType,
  formValues: MultipleChoiseValues & {
    options: MultipleChoiseOption[];
    text: string;
  }
) {
  if (type === "MULTIPLE_CHOICE") {
    return {
      question: formValues.question,
      answer: formValues.answer,
      image:
        formValues.additionalFile && formValues.additionalFile instanceof File
          ? URL.createObjectURL(formValues.additionalFile)
          : typeof formValues.additionalFile === "string"
          ? formValues.additionalFile
          : "",
      options: formValues.options.map((item) => {
        return {
          content:
            item.content instanceof File
              ? URL.createObjectURL(item.content)
              : item.content,
          type: formValues.type,
        };
      }),
    };
  }
  return {
    text: formValues.text,
  };
}

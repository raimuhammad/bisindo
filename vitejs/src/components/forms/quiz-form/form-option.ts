import * as yup from "yup";
import { QuizType } from "root/models/stores";
import { QuizTypeLabel } from "root/models/stores";
import { selectFieldFactory } from "components/form-fields/select-field";
import { resolverFactory } from "utils/resolver-factory";
import { lang } from "./properties";

const options = Object.keys(QuizTypeLabel).map((item) => ({
  value: item,
  label: QuizTypeLabel[item as keyof typeof QuizTypeLabel],
}));

export const SelectTypeField = selectFieldFactory(options);

const imageRule = yup.object({
  letters: yup.string().required().length(5, lang.invalidLetterLen),
});
const wordRule = yup.object({
  word: yup.string().required().length(5, lang.invalidWordLen),
});
const multipleChoiceRule = yup.object({
  options: yup.array().of(yup.string()),
  question_answer: yup
    .string()
    .when("options", (values: any, schma: yup.StringSchema) => {
      return schma.oneOf(values, lang.invalidOption);
    }),
});
export const resolver = resolverFactory({
  show_at: yup.number().min(10, ""),
  type: yup
    .string()
    .oneOf(
      [
        QuizType.MULTIPLE_CHOICE,
        QuizType.LETTER_SEQUENCE,
        QuizType.IMAGE_MATCH,
      ],
      lang.invalidType
    ),
  meta_data: yup.object().when("type", (type: QuizType) => {
    switch (type) {
      case QuizType.MULTIPLE_CHOICE:
        return multipleChoiceRule;
      case QuizType.LETTER_SEQUENCE:
        return wordRule;
      case QuizType.IMAGE_MATCH:
        return imageRule;
    }
  }),
});

import { array, mixed, number, object, string } from "yup";
import { mutationServiceFactory } from "@utils/mutation-service-factory";
import { QuizModelSelector, QuizModelType, QuizType } from "@root/models";
import { RootStoreBaseMutations, RootStoreBaseQueries } from "@root-model";

const optionSchema = object({
  index: number().required(),
  content: mixed().test((v) => {
    if (!v) return false;
    return v instanceof File || typeof v === "string";
  }),
  type: string().oneOf(["image", "text"]).required(),
}).test((v) => {
  if (v.type === "image") {
    return v.content instanceof File && v.content.type.includes("image");
  }
  return typeof v.content === "string";
});

export const multipleChoiceSchema = {
  answer: number().oneOf([0, 1, 2, 3]).required(),
  options: array(optionSchema).required(),
  question: string().required(),
  additionFile: mixed().test((v) => {
    if (v) {
      return v.content instanceof File && v.content.type.includes("image");
    }
    return true;
  }),
};
export const ImageMatchSchema = {
  text: string().required().min(2).max(10),
};

const createMultipleChoice = mutationServiceFactory<
  QuizModelType,
  RootStoreBaseMutations.mutateMultipleChoiseQuiz
>({
  schema: multipleChoiceSchema,
  mutation: RootStoreBaseMutations.mutateMultipleChoiseQuiz,
});
const createImageMatch = mutationServiceFactory<
  QuizModelType,
  RootStoreBaseMutations.mutateImageMatchQuiz
>({
  schema: ImageMatchSchema,
  mutation: RootStoreBaseMutations.mutateImageMatchQuiz,
});

const builder = (instance: QuizModelSelector) =>
  instance.image_matcher.id.type.video_id.show_at.created_at.created_at.question.additional_image.choises(
    (i) => i.id.text.image.index
  );

const paginatorOptions = {
  queryKey: RootStoreBaseQueries.queryQuizes,
  modelBuilder: builder,
};

const createLetterSequence = mutationServiceFactory<
  QuizModelType,
  RootStoreBaseMutations.mutateLetterSequenceQuiz
>({
  schema: ImageMatchSchema,
  mutation: RootStoreBaseMutations.mutateLetterSequenceQuiz,
});

export const service = {
  create: {
    [QuizType.MULTIPLE_CHOICE]: createMultipleChoice,
    [QuizType.IMAGE_MATCH]: createImageMatch,
    [QuizType.LETTER_SEQUENCE]: createLetterSequence,
  },
  paginatorOptions,
};

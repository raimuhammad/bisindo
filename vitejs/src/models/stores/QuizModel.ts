import { Instance } from "mobx-state-tree";
import { QuizModelBase } from "./QuizModel.base";
import { QuizType } from "root/models/stores/QuizTypeEnum";
import moment, { duration } from "moment";
import { getDurationTimeText } from "utils/get-duration-time";

/* The TypeScript type of an instance of QuizModel */
export interface QuizModelType extends Instance<typeof QuizModel.Type> {}

/* A graphql query fragment builders for QuizModel */
export {
  selectFromQuiz,
  quizModelPrimitives,
  QuizModelSelector,
} from "./QuizModel.base";

export const QuizTypeLabel: Record<QuizType, string> = {
  LETTER_SEQUENCE: "Pengurutan huruf",
  MULTIPLE_CHOICE: "Pilihan ganda",
  [QuizType.IMAGE_MATCH]: "Mencocokan huruf & gambar",
};

const getLable = (type: QuizType): string => {
  return QuizTypeLabel[type] ?? "";
};

const getMinutes = (n: number) => {
  let dur = 0;
  let compare = n;
  while (compare > 60) {
    compare -= 60;
    dur++;
  }
  return dur;
};

/**
 * QuizModel
 */
export const QuizModel = QuizModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self));
  },
})).views((model) => ({
  get label() {
    return getLable(model.type as QuizType);
  },
  get playAtDuration() {
    return getDurationTimeText(model.show_at ?? 0);
  },
}));

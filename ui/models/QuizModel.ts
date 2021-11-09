import { Instance } from "mobx-state-tree";
import { QuizModelBase } from "./QuizModel.base";
import { modelMoment } from "@utils/model-moment";
import { QuizType } from "@models/QuizTypeEnum";
import { getDurationTimeText } from "@utils/get-duration-time";

/* The TypeScript type of an instance of QuizModel */
export interface QuizModelType extends Instance<typeof QuizModel.Type> {}

/* A graphql query fragment builders for QuizModel */
export {
  selectFromQuiz,
  quizModelPrimitives,
  QuizModelSelector,
} from "./QuizModel.base";

const typeMapLabel: Record<QuizType, string> = {
  MULTIPLE_CHOICE: "Pilihan ganda",
  IMAGE_MATCH: "Pencocokan gambar",
  LETTER_SEQUENCE: "Urut gambar",
};

/**
 * QuizModel
 */
export const QuizModel = QuizModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self));
  },
}))
  .views((self) => ({
    get typeLabel() {
      return typeMapLabel[self.type as QuizType];
    },
  }))
  .views(modelMoment)
  .views((self) => ({
    get durationText() {
      return getDurationTimeText(self.show_at ?? 0);
    },
  }));

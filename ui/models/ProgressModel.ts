import { Instance } from "mobx-state-tree";
import { ProgressModelBase } from "./ProgressModel.base";

/* The TypeScript type of an instance of ProgressModel */
export interface ProgressModelType
  extends Instance<typeof ProgressModel.Type> {}

/* A graphql query fragment builders for ProgressModel */
export {
  selectFromProgress,
  progressModelPrimitives,
  ProgressModelSelector,
} from "./ProgressModel.base";

export type VideoHistory = {
  time: number;
  video_id: string;
};
export type QuizHistory = {
  id: string;
  correct: boolean;
  videoId: number;
};

/**
 * ProgressModel
 */
export const ProgressModel = ProgressModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self));
  },
})).views((model) => ({
  get videoHistories(): VideoHistory[] {
    if (model.video_histories) {
      return JSON.parse(model.video_histories);
    }
    return [];
  },
  get quizHistories(): QuizHistory[] {
    if (model.quiz_histories) {
      return JSON.parse(model.quiz_histories);
    }
    return [];
  },
}));

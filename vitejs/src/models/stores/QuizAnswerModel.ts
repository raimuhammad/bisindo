import { Instance } from "mobx-state-tree"
import { QuizAnswerModelBase } from "./QuizAnswerModel.base"

/* The TypeScript type of an instance of QuizAnswerModel */
export interface QuizAnswerModelType extends Instance<typeof QuizAnswerModel.Type> {}

/* A graphql query fragment builders for QuizAnswerModel */
export { selectFromQuizAnswer, quizAnswerModelPrimitives, QuizAnswerModelSelector } from "./QuizAnswerModel.base"

/**
 * QuizAnswerModel
 */
export const QuizAnswerModel = QuizAnswerModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

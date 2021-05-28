import { Instance } from "mobx-state-tree"
import { QuizPaginatorModelBase } from "./QuizPaginatorModel.base"

/* The TypeScript type of an instance of QuizPaginatorModel */
export interface QuizPaginatorModelType extends Instance<typeof QuizPaginatorModel.Type> {}

/* A graphql query fragment builders for QuizPaginatorModel */
export { selectFromQuizPaginator, quizPaginatorModelPrimitives, QuizPaginatorModelSelector } from "./QuizPaginatorModel.base"

/**
 * QuizPaginatorModel
 *
 * A paginated list of Quiz items.
 */
export const QuizPaginatorModel = QuizPaginatorModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { QuizTypeEnumType } from "./QuizTypeEnum"
import { RootStoreType } from "./index"


/**
 * QuizBase
 * auto generated base class for the model QuizModel.
 */
export const QuizModelBase = ModelBase
  .named('Quiz')
  .props({
    __typename: types.optional(types.literal("Quiz"), "Quiz"),
    id: types.identifier,
    created_at: types.union(types.undefined, types.frozen()),
    updated_at: types.union(types.undefined, types.null, types.frozen()),
    video_id: types.union(types.undefined, types.string),
    show_at: types.union(types.undefined, types.number),
    type: types.union(types.undefined, QuizTypeEnumType),
    letters: types.union(types.undefined, types.null, types.string),
    word: types.union(types.undefined, types.null, types.string),
    question: types.union(types.undefined, types.null, types.string),
    options: types.union(types.undefined, types.null, types.array(types.string)),
    question_answer: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class QuizModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get created_at() { return this.__attr(`created_at`) }
  get updated_at() { return this.__attr(`updated_at`) }
  get video_id() { return this.__attr(`video_id`) }
  get show_at() { return this.__attr(`show_at`) }
  get type() { return this.__attr(`type`) }
  get letters() { return this.__attr(`letters`) }
  get word() { return this.__attr(`word`) }
  get question() { return this.__attr(`question`) }
  get options() { return this.__attr(`options`) }
  get question_answer() { return this.__attr(`question_answer`) }
}
export function selectFromQuiz() {
  return new QuizModelSelector()
}

export const quizModelPrimitives = selectFromQuiz().created_at.updated_at.video_id.show_at.type.letters.word.question.options.question_answer

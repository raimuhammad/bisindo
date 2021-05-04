/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * QuizAnswerBase
 * auto generated base class for the model QuizAnswerModel.
 */
export const QuizAnswerModelBase = ModelBase
  .named('QuizAnswer')
  .props({
    __typename: types.optional(types.literal("QuizAnswer"), "QuizAnswer"),
    id: types.identifier,
    created_at: types.union(types.undefined, types.frozen()),
    updated_at: types.union(types.undefined, types.null, types.frozen()),
    user_id: types.union(types.undefined, types.string),
    quiz_id: types.union(types.undefined, types.string),
    to: types.union(types.undefined, types.null, types.array(types.union(types.null, types.string))),
    from: types.union(types.undefined, types.null, types.array(types.union(types.null, types.string))),
    items: types.union(types.undefined, types.null, types.array(types.union(types.null, types.string))),
    selected: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class QuizAnswerModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get created_at() { return this.__attr(`created_at`) }
  get updated_at() { return this.__attr(`updated_at`) }
  get user_id() { return this.__attr(`user_id`) }
  get quiz_id() { return this.__attr(`quiz_id`) }
  get to() { return this.__attr(`to`) }
  get from() { return this.__attr(`from`) }
  get items() { return this.__attr(`items`) }
  get selected() { return this.__attr(`selected`) }
}
export function selectFromQuizAnswer() {
  return new QuizAnswerModelSelector()
}

export const quizAnswerModelPrimitives = selectFromQuizAnswer().created_at.updated_at.user_id.quiz_id.to.from.items.selected

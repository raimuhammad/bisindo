/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { MultipleChoiseModel, MultipleChoiseModelType } from "./MultipleChoiseModel"
import { MultipleChoiseModelSelector } from "./MultipleChoiseModel.base"
import { QuizTypeEnumType } from "./QuizTypeEnum"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  choises: IObservableArray<MultipleChoiseModelType>;
}

/**
 * QuizBase
 * auto generated base class for the model QuizModel.
 */
export const QuizModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Quiz')
  .props({
    __typename: types.optional(types.literal("Quiz"), "Quiz"),
    id: types.identifier,
    created_at: types.union(types.undefined, types.frozen()),
    updated_at: types.union(types.undefined, types.null, types.frozen()),
    video_id: types.union(types.undefined, types.string),
    show_at: types.union(types.undefined, types.number),
    type: types.union(types.undefined, QuizTypeEnumType),
    choises: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => MultipleChoiseModel)))),
    question: types.union(types.undefined, types.string),
    additional_image: types.union(types.undefined, types.string),
    image_matcher: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class QuizModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get created_at() { return this.__attr(`created_at`) }
  get updated_at() { return this.__attr(`updated_at`) }
  get video_id() { return this.__attr(`video_id`) }
  get show_at() { return this.__attr(`show_at`) }
  get type() { return this.__attr(`type`) }
  get question() { return this.__attr(`question`) }
  get additional_image() { return this.__attr(`additional_image`) }
  get image_matcher() { return this.__attr(`image_matcher`) }
  choises(builder?: string | MultipleChoiseModelSelector | ((selector: MultipleChoiseModelSelector) => MultipleChoiseModelSelector)) { return this.__child(`choises`, MultipleChoiseModelSelector, builder) }
}
export function selectFromQuiz() {
  return new QuizModelSelector()
}

export const quizModelPrimitives = selectFromQuiz().created_at.updated_at.video_id.show_at.type.question.additional_image.image_matcher

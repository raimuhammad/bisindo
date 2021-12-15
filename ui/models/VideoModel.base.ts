/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GradeModel, GradeModelType } from "./GradeModel"
import { GradeModelSelector } from "./GradeModel.base"
import { ProgressModel, ProgressModelType } from "./ProgressModel"
import { ProgressModelSelector } from "./ProgressModel.base"
import { QuizModel, QuizModelType } from "./QuizModel"
import { QuizModelSelector } from "./QuizModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  grades: IObservableArray<GradeModelType>;
  quizes: IObservableArray<QuizModelType>;
  student_progress: IObservableArray<ProgressModelType>;
}

/**
 * VideoBase
 * auto generated base class for the model VideoModel.
 */
export const VideoModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Video')
  .props({
    __typename: types.optional(types.literal("Video"), "Video"),
    id: types.identifier,
    created_at: types.union(types.undefined, types.frozen()),
    updated_at: types.union(types.undefined, types.null, types.frozen()),
    title: types.union(types.undefined, types.string),
    caption: types.union(types.undefined, types.string),
    description: types.union(types.undefined, types.string),
    content: types.union(types.undefined, types.string),
    thumbnail: types.union(types.undefined, types.string),
    duration: types.union(types.undefined, types.integer),
    grades: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => GradeModel)))),
    quizes: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => QuizModel)))),
    student_progress: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => ProgressModel)))),
    quiz_count: types.union(types.undefined, types.integer),
    order: types.union(types.undefined, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class VideoModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get created_at() { return this.__attr(`created_at`) }
  get updated_at() { return this.__attr(`updated_at`) }
  get title() { return this.__attr(`title`) }
  get caption() { return this.__attr(`caption`) }
  get description() { return this.__attr(`description`) }
  get content() { return this.__attr(`content`) }
  get thumbnail() { return this.__attr(`thumbnail`) }
  get duration() { return this.__attr(`duration`) }
  get quiz_count() { return this.__attr(`quiz_count`) }
  get order() { return this.__attr(`order`) }
  grades(builder?: string | GradeModelSelector | ((selector: GradeModelSelector) => GradeModelSelector)) { return this.__child(`grades`, GradeModelSelector, builder) }
  quizes(builder?: string | QuizModelSelector | ((selector: QuizModelSelector) => QuizModelSelector)) { return this.__child(`quizes`, QuizModelSelector, builder) }
  student_progress(builder?: string | ProgressModelSelector | ((selector: ProgressModelSelector) => ProgressModelSelector)) { return this.__child(`student_progress`, ProgressModelSelector, builder) }
}
export function selectFromVideo() {
  return new VideoModelSelector()
}

export const videoModelPrimitives = selectFromVideo().created_at.updated_at.title.caption.description.content.thumbnail.duration.quiz_count.order

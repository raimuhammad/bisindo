/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * VideoGradeBase
 * auto generated base class for the model VideoGradeModel.
 */
export const VideoGradeModelBase = ModelBase
  .named('VideoGrade')
  .props({
    __typename: types.optional(types.literal("VideoGrade"), "VideoGrade"),
    id: types.identifier,
    created_at: types.union(types.undefined, types.frozen()),
    updated_at: types.union(types.undefined, types.null, types.frozen()),
    video_id: types.union(types.undefined, types.string),
    grade_id: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VideoGradeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get created_at() { return this.__attr(`created_at`) }
  get updated_at() { return this.__attr(`updated_at`) }
  get video_id() { return this.__attr(`video_id`) }
  get grade_id() { return this.__attr(`grade_id`) }
}
export function selectFromVideoGrade() {
  return new VideoGradeModelSelector()
}

export const videoGradeModelPrimitives = selectFromVideoGrade().created_at.updated_at.video_id.grade_id

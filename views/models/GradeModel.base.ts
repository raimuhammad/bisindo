/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { StudentGradeModel, StudentGradeModelType } from "./StudentGradeModel"
import { StudentGradeModelSelector } from "./StudentGradeModel.base"
import { VideoModel, VideoModelType } from "./VideoModel"
import { VideoModelSelector } from "./VideoModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  students: IObservableArray<StudentGradeModelType>;
  videos: IObservableArray<VideoModelType>;
}

/**
 * GradeBase
 * auto generated base class for the model GradeModel.
 */
export const GradeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Grade')
  .props({
    __typename: types.optional(types.literal("Grade"), "Grade"),
    id: types.identifier,
    student_count: types.union(types.undefined, types.integer),
    video_count: types.union(types.undefined, types.integer),
    name: types.union(types.undefined, types.string),
    students: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => StudentGradeModel)))),
    videos: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => VideoModel)))),
    created_at: types.union(types.undefined, types.frozen()),
    updated_at: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class GradeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get student_count() { return this.__attr(`student_count`) }
  get video_count() { return this.__attr(`video_count`) }
  get name() { return this.__attr(`name`) }
  get created_at() { return this.__attr(`created_at`) }
  get updated_at() { return this.__attr(`updated_at`) }
  students(builder?: string | StudentGradeModelSelector | ((selector: StudentGradeModelSelector) => StudentGradeModelSelector)) { return this.__child(`students`, StudentGradeModelSelector, builder) }
  videos(builder?: string | VideoModelSelector | ((selector: VideoModelSelector) => VideoModelSelector)) { return this.__child(`videos`, VideoModelSelector, builder) }
}
export function selectFromGrade() {
  return new GradeModelSelector()
}

export const gradeModelPrimitives = selectFromGrade().student_count.video_count.name.created_at.updated_at

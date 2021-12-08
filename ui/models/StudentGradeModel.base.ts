/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GradeModel, GradeModelType } from "./GradeModel"
import { GradeModelSelector } from "./GradeModel.base"
import { ProgressModel, ProgressModelType } from "./ProgressModel"
import { ProgressModelSelector } from "./ProgressModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  student: UserModelType;
  grade: GradeModelType;
  progress: ProgressModelType;
}

/**
 * StudentGradeBase
 * auto generated base class for the model StudentGradeModel.
 */
export const StudentGradeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('StudentGrade')
  .props({
    __typename: types.optional(types.literal("StudentGrade"), "StudentGrade"),
    id: types.identifier,
    created_at: types.union(types.undefined, types.frozen()),
    updated_at: types.union(types.undefined, types.null, types.frozen()),
    student: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => UserModel))),
    grade: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => GradeModel))),
    progress: types.union(types.undefined, MSTGQLRef(types.late((): any => ProgressModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class StudentGradeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get created_at() { return this.__attr(`created_at`) }
  get updated_at() { return this.__attr(`updated_at`) }
  student(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`student`, UserModelSelector, builder) }
  grade(builder?: string | GradeModelSelector | ((selector: GradeModelSelector) => GradeModelSelector)) { return this.__child(`grade`, GradeModelSelector, builder) }
  progress(builder?: string | ProgressModelSelector | ((selector: ProgressModelSelector) => ProgressModelSelector)) { return this.__child(`progress`, ProgressModelSelector, builder) }
}
export function selectFromStudentGrade() {
  return new StudentGradeModelSelector()
}

export const studentGradeModelPrimitives = selectFromStudentGrade().created_at.updated_at

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PaginatorInfoModel, PaginatorInfoModelType } from "./PaginatorInfoModel"
import { PaginatorInfoModelSelector } from "./PaginatorInfoModel.base"
import { StudentGradeModel, StudentGradeModelType } from "./StudentGradeModel"
import { StudentGradeModelSelector } from "./StudentGradeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  data: IObservableArray<StudentGradeModelType>;
}

/**
 * StudentGradePaginatorBase
 * auto generated base class for the model StudentGradePaginatorModel.
 *
 * A paginated list of StudentGrade items.
 */
export const StudentGradePaginatorModelBase = withTypedRefs<Refs>()(ModelBase
  .named('StudentGradePaginator')
  .props({
    __typename: types.optional(types.literal("StudentGradePaginator"), "StudentGradePaginator"),
    /** Pagination information about the list of items. */
    paginatorInfo: types.union(types.undefined, types.late((): any => PaginatorInfoModel)),
    /** A list of StudentGrade items. */
    data: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => StudentGradeModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class StudentGradePaginatorModelSelector extends QueryBuilder {
  paginatorInfo(builder?: string | PaginatorInfoModelSelector | ((selector: PaginatorInfoModelSelector) => PaginatorInfoModelSelector)) { return this.__child(`paginatorInfo`, PaginatorInfoModelSelector, builder) }
  data(builder?: string | StudentGradeModelSelector | ((selector: StudentGradeModelSelector) => StudentGradeModelSelector)) { return this.__child(`data`, StudentGradeModelSelector, builder) }
}
export function selectFromStudentGradePaginator() {
  return new StudentGradePaginatorModelSelector()
}

export const studentGradePaginatorModelPrimitives = selectFromStudentGradePaginator()

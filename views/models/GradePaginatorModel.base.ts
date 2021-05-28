/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GradeModel, GradeModelType } from "./GradeModel"
import { GradeModelSelector } from "./GradeModel.base"
import { PaginatorInfoModel, PaginatorInfoModelType } from "./PaginatorInfoModel"
import { PaginatorInfoModelSelector } from "./PaginatorInfoModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  data: IObservableArray<GradeModelType>;
}

/**
 * GradePaginatorBase
 * auto generated base class for the model GradePaginatorModel.
 *
 * A paginated list of Grade items.
 */
export const GradePaginatorModelBase = withTypedRefs<Refs>()(ModelBase
  .named('GradePaginator')
  .props({
    __typename: types.optional(types.literal("GradePaginator"), "GradePaginator"),
    /** Pagination information about the list of items. */
    paginatorInfo: types.union(types.undefined, types.late((): any => PaginatorInfoModel)),
    /** A list of Grade items. */
    data: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => GradeModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class GradePaginatorModelSelector extends QueryBuilder {
  paginatorInfo(builder?: string | PaginatorInfoModelSelector | ((selector: PaginatorInfoModelSelector) => PaginatorInfoModelSelector)) { return this.__child(`paginatorInfo`, PaginatorInfoModelSelector, builder) }
  data(builder?: string | GradeModelSelector | ((selector: GradeModelSelector) => GradeModelSelector)) { return this.__child(`data`, GradeModelSelector, builder) }
}
export function selectFromGradePaginator() {
  return new GradePaginatorModelSelector()
}

export const gradePaginatorModelPrimitives = selectFromGradePaginator()

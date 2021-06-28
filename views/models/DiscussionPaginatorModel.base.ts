/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { DiscussionModel, DiscussionModelType } from "./DiscussionModel"
import { DiscussionModelSelector } from "./DiscussionModel.base"
import { PaginatorInfoModel, PaginatorInfoModelType } from "./PaginatorInfoModel"
import { PaginatorInfoModelSelector } from "./PaginatorInfoModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  data: IObservableArray<DiscussionModelType>;
}

/**
 * DiscussionPaginatorBase
 * auto generated base class for the model DiscussionPaginatorModel.
 *
 * A paginated list of Discussion items.
 */
export const DiscussionPaginatorModelBase = withTypedRefs<Refs>()(ModelBase
  .named('DiscussionPaginator')
  .props({
    __typename: types.optional(types.literal("DiscussionPaginator"), "DiscussionPaginator"),
    /** Pagination information about the list of items. */
    paginatorInfo: types.union(types.undefined, types.late((): any => PaginatorInfoModel)),
    /** A list of Discussion items. */
    data: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => DiscussionModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class DiscussionPaginatorModelSelector extends QueryBuilder {
  paginatorInfo(builder?: string | PaginatorInfoModelSelector | ((selector: PaginatorInfoModelSelector) => PaginatorInfoModelSelector)) { return this.__child(`paginatorInfo`, PaginatorInfoModelSelector, builder) }
  data(builder?: string | DiscussionModelSelector | ((selector: DiscussionModelSelector) => DiscussionModelSelector)) { return this.__child(`data`, DiscussionModelSelector, builder) }
}
export function selectFromDiscussionPaginator() {
  return new DiscussionPaginatorModelSelector()
}

export const discussionPaginatorModelPrimitives = selectFromDiscussionPaginator()

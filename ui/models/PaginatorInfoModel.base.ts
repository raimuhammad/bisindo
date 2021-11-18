/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * PaginatorInfoBase
 * auto generated base class for the model PaginatorInfoModel.
 *
 * Information about pagination using a fully featured paginator.
 */
export const PaginatorInfoModelBase = ModelBase
  .named('PaginatorInfo')
  .props({
    __typename: types.optional(types.literal("PaginatorInfo"), "PaginatorInfo"),
    /** Number of items in the current page. */
    count: types.union(types.undefined, types.integer),
    /** Index of the current page. */
    currentPage: types.union(types.undefined, types.integer),
    /** Index of the first item in the current page. */
    firstItem: types.union(types.undefined, types.null, types.integer),
    /** Are there more pages after this one? */
    hasMorePages: types.union(types.undefined, types.boolean),
    /** Index of the last item in the current page. */
    lastItem: types.union(types.undefined, types.null, types.integer),
    /** Index of the last available page. */
    lastPage: types.union(types.undefined, types.integer),
    /** Number of items per page. */
    perPage: types.union(types.undefined, types.integer),
    /** Number of total available items. */
    total: types.union(types.undefined, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PaginatorInfoModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  get currentPage() { return this.__attr(`currentPage`) }
  get firstItem() { return this.__attr(`firstItem`) }
  get hasMorePages() { return this.__attr(`hasMorePages`) }
  get lastItem() { return this.__attr(`lastItem`) }
  get lastPage() { return this.__attr(`lastPage`) }
  get perPage() { return this.__attr(`perPage`) }
  get total() { return this.__attr(`total`) }
}
export function selectFromPaginatorInfo() {
  return new PaginatorInfoModelSelector()
}

export const paginatorInfoModelPrimitives = selectFromPaginatorInfo().count.currentPage.firstItem.hasMorePages.lastItem.lastPage.perPage.total

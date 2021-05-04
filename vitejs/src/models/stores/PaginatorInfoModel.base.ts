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
 * Pagination information about the corresponding list of items.
 */
export const PaginatorInfoModelBase = ModelBase
  .named('PaginatorInfo')
  .props({
    __typename: types.optional(types.literal("PaginatorInfo"), "PaginatorInfo"),
    /** Total count of available items in the page. */
    count: types.union(types.undefined, types.integer),
    /** Current pagination page. */
    currentPage: types.union(types.undefined, types.integer),
    /** Index of first item in the current page. */
    firstItem: types.union(types.undefined, types.null, types.integer),
    /** If collection has more pages. */
    hasMorePages: types.union(types.undefined, types.boolean),
    /** Index of last item in the current page. */
    lastItem: types.union(types.undefined, types.null, types.integer),
    /** Last page number of the collection. */
    lastPage: types.union(types.undefined, types.integer),
    /** Number of items per page in the collection. */
    perPage: types.union(types.undefined, types.integer),
    /** Total items available in the collection. */
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

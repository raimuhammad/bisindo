/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * PageInfoBase
 * auto generated base class for the model PageInfoModel.
 *
 * Information about pagination using a Relay style cursor connection.
 */
export const PageInfoModelBase = ModelBase
  .named('PageInfo')
  .props({
    __typename: types.optional(types.literal("PageInfo"), "PageInfo"),
    /** When paginating forwards, are there more items? */
    hasNextPage: types.union(types.undefined, types.boolean),
    /** When paginating backwards, are there more items? */
    hasPreviousPage: types.union(types.undefined, types.boolean),
    /** The cursor to continue paginating backwards. */
    startCursor: types.union(types.undefined, types.null, types.string),
    /** The cursor to continue paginating forwards. */
    endCursor: types.union(types.undefined, types.null, types.string),
    /** Total number of nodes in the paginated connection. */
    total: types.union(types.undefined, types.integer),
    /** Number of nodes in the current page. */
    count: types.union(types.undefined, types.integer),
    /** Index of the current page. */
    currentPage: types.union(types.undefined, types.integer),
    /** Index of the last available page. */
    lastPage: types.union(types.undefined, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PageInfoModelSelector extends QueryBuilder {
  get hasNextPage() { return this.__attr(`hasNextPage`) }
  get hasPreviousPage() { return this.__attr(`hasPreviousPage`) }
  get startCursor() { return this.__attr(`startCursor`) }
  get endCursor() { return this.__attr(`endCursor`) }
  get total() { return this.__attr(`total`) }
  get count() { return this.__attr(`count`) }
  get currentPage() { return this.__attr(`currentPage`) }
  get lastPage() { return this.__attr(`lastPage`) }
}
export function selectFromPageInfo() {
  return new PageInfoModelSelector()
}

export const pageInfoModelPrimitives = selectFromPageInfo().hasNextPage.hasPreviousPage.startCursor.endCursor.total.count.currentPage.lastPage

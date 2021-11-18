/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * SimplePaginatorInfoBase
 * auto generated base class for the model SimplePaginatorInfoModel.
 *
 * Information about pagination using a simple paginator.
 */
export const SimplePaginatorInfoModelBase = ModelBase
  .named('SimplePaginatorInfo')
  .props({
    __typename: types.optional(types.literal("SimplePaginatorInfo"), "SimplePaginatorInfo"),
    /** Number of items in the current page. */
    count: types.union(types.undefined, types.integer),
    /** Index of the current page. */
    currentPage: types.union(types.undefined, types.integer),
    /** Index of the first item in the current page. */
    firstItem: types.union(types.undefined, types.null, types.integer),
    /** Index of the last item in the current page. */
    lastItem: types.union(types.undefined, types.null, types.integer),
    /** Number of items per page. */
    perPage: types.union(types.undefined, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SimplePaginatorInfoModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  get currentPage() { return this.__attr(`currentPage`) }
  get firstItem() { return this.__attr(`firstItem`) }
  get lastItem() { return this.__attr(`lastItem`) }
  get perPage() { return this.__attr(`perPage`) }
}
export function selectFromSimplePaginatorInfo() {
  return new SimplePaginatorInfoModelSelector()
}

export const simplePaginatorInfoModelPrimitives = selectFromSimplePaginatorInfo().count.currentPage.firstItem.lastItem.perPage

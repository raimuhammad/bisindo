/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ProgressBase
 * auto generated base class for the model ProgressModel.
 */
export const ProgressModelBase = ModelBase
  .named('Progress')
  .props({
    __typename: types.optional(types.literal("Progress"), "Progress"),
    id: types.identifier,
    videoHistory: types.union(types.undefined, types.string),
    completion: types.union(types.undefined, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ProgressModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get videoHistory() { return this.__attr(`videoHistory`) }
  get completion() { return this.__attr(`completion`) }
}
export function selectFromProgress() {
  return new ProgressModelSelector()
}

export const progressModelPrimitives = selectFromProgress().videoHistory.completion

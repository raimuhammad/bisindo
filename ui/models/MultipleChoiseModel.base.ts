/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * MultipleChoiseBase
 * auto generated base class for the model MultipleChoiseModel.
 */
export const MultipleChoiseModelBase = ModelBase
  .named('MultipleChoise')
  .props({
    __typename: types.optional(types.literal("MultipleChoise"), "MultipleChoise"),
    id: types.identifier,
    image: types.union(types.undefined, types.string),
    text: types.union(types.undefined, types.string),
    index: types.union(types.undefined, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MultipleChoiseModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get image() { return this.__attr(`image`) }
  get text() { return this.__attr(`text`) }
  get index() { return this.__attr(`index`) }
}
export function selectFromMultipleChoise() {
  return new MultipleChoiseModelSelector()
}

export const multipleChoiseModelPrimitives = selectFromMultipleChoise().image.text.index

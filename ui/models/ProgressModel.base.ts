/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  user: UserModelType;
}

/**
 * ProgressBase
 * auto generated base class for the model ProgressModel.
 */
export const ProgressModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Progress')
  .props({
    __typename: types.optional(types.literal("Progress"), "Progress"),
    id: types.identifier,
    user_id: types.union(types.undefined, types.string),
    user: types.union(types.undefined, MSTGQLRef(types.late((): any => UserModel))),
    video_histories: types.union(types.undefined, types.string),
    quiz_histories: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class ProgressModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get user_id() { return this.__attr(`user_id`) }
  get video_histories() { return this.__attr(`video_histories`) }
  get quiz_histories() { return this.__attr(`quiz_histories`) }
  user(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`user`, UserModelSelector, builder) }
}
export function selectFromProgress() {
  return new ProgressModelSelector()
}

export const progressModelPrimitives = selectFromProgress().user_id.video_histories.quiz_histories

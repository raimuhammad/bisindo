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
 * DiscussionBase
 * auto generated base class for the model DiscussionModel.
 */
export const DiscussionModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Discussion')
  .props({
    __typename: types.optional(types.literal("Discussion"), "Discussion"),
    id: types.identifier,
    user_id: types.identifier,
    user: types.union(types.undefined, MSTGQLRef(types.late((): any => UserModel))),
    content: types.union(types.undefined, types.string),
    created_at: types.union(types.undefined, types.frozen()),
    updated_at: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class DiscussionModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get user_id() { return this.__attr(`user_id`) }
  get content() { return this.__attr(`content`) }
  get created_at() { return this.__attr(`created_at`) }
  get updated_at() { return this.__attr(`updated_at`) }
  user(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`user`, UserModelSelector, builder) }
}
export function selectFromDiscussion() {
  return new DiscussionModelSelector()
}

export const discussionModelPrimitives = selectFromDiscussion().user_id.content.created_at.updated_at

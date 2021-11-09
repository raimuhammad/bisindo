/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { AppRoleEnumType } from "./AppRoleEnum"
import { RootStoreType } from "./index"


/**
 * UserBase
 * auto generated base class for the model UserModel.
 */
export const UserModelBase = ModelBase
  .named('User')
  .props({
    __typename: types.optional(types.literal("User"), "User"),
    id: types.identifier,
    name: types.union(types.undefined, types.string),
    email: types.union(types.undefined, types.string),
    created_at: types.union(types.undefined, types.frozen()),
    updated_at: types.union(types.undefined, types.null, types.frozen()),
    role: types.union(types.undefined, AppRoleEnumType),
    need_change_password: types.union(types.undefined, types.boolean),
    active: types.union(types.undefined, types.null, types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class UserModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get email() { return this.__attr(`email`) }
  get created_at() { return this.__attr(`created_at`) }
  get updated_at() { return this.__attr(`updated_at`) }
  get role() { return this.__attr(`role`) }
  get need_change_password() { return this.__attr(`need_change_password`) }
  get active() { return this.__attr(`active`) }
}
export function selectFromUser() {
  return new UserModelSelector()
}

export const userModelPrimitives = selectFromUser().name.email.created_at.updated_at.role.need_change_password.active

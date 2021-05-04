/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * VideoBase
 * auto generated base class for the model VideoModel.
 */
export const VideoModelBase = ModelBase
  .named('Video')
  .props({
    __typename: types.optional(types.literal("Video"), "Video"),
    id: types.identifier,
    created_at: types.union(types.undefined, types.frozen()),
    updated_at: types.union(types.undefined, types.null, types.frozen()),
    title: types.union(types.undefined, types.string),
    caption: types.union(types.undefined, types.string),
    description: types.union(types.undefined, types.string),
    content: types.union(types.undefined, types.string),
    thumbnail: types.union(types.undefined, types.string),
    duration: types.union(types.undefined, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VideoModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get created_at() { return this.__attr(`created_at`) }
  get updated_at() { return this.__attr(`updated_at`) }
  get title() { return this.__attr(`title`) }
  get caption() { return this.__attr(`caption`) }
  get description() { return this.__attr(`description`) }
  get content() { return this.__attr(`content`) }
  get thumbnail() { return this.__attr(`thumbnail`) }
  get duration() { return this.__attr(`duration`) }
}
export function selectFromVideo() {
  return new VideoModelSelector()
}

export const videoModelPrimitives = selectFromVideo().created_at.updated_at.title.caption.description.content.thumbnail.duration

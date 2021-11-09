/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PaginatorInfoModel, PaginatorInfoModelType } from "./PaginatorInfoModel"
import { PaginatorInfoModelSelector } from "./PaginatorInfoModel.base"
import { VideoModel, VideoModelType } from "./VideoModel"
import { VideoModelSelector } from "./VideoModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  data: IObservableArray<VideoModelType>;
}

/**
 * VideoPaginatorBase
 * auto generated base class for the model VideoPaginatorModel.
 *
 * A paginated list of Video items.
 */
export const VideoPaginatorModelBase = withTypedRefs<Refs>()(ModelBase
  .named('VideoPaginator')
  .props({
    __typename: types.optional(types.literal("VideoPaginator"), "VideoPaginator"),
    /** Pagination information about the list of items. */
    paginatorInfo: types.union(types.undefined, types.late((): any => PaginatorInfoModel)),
    /** A list of Video items. */
    data: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => VideoModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class VideoPaginatorModelSelector extends QueryBuilder {
  paginatorInfo(builder?: string | PaginatorInfoModelSelector | ((selector: PaginatorInfoModelSelector) => PaginatorInfoModelSelector)) { return this.__child(`paginatorInfo`, PaginatorInfoModelSelector, builder) }
  data(builder?: string | VideoModelSelector | ((selector: VideoModelSelector) => VideoModelSelector)) { return this.__child(`data`, VideoModelSelector, builder) }
}
export function selectFromVideoPaginator() {
  return new VideoPaginatorModelSelector()
}

export const videoPaginatorModelPrimitives = selectFromVideoPaginator()

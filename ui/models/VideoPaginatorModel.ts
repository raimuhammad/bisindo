import { Instance } from "mobx-state-tree"
import { VideoPaginatorModelBase } from "./VideoPaginatorModel.base"

/* The TypeScript type of an instance of VideoPaginatorModel */
export interface VideoPaginatorModelType extends Instance<typeof VideoPaginatorModel.Type> {}

/* A graphql query fragment builders for VideoPaginatorModel */
export { selectFromVideoPaginator, videoPaginatorModelPrimitives, VideoPaginatorModelSelector } from "./VideoPaginatorModel.base"

/**
 * VideoPaginatorModel
 *
 * A paginated list of Video items.
 */
export const VideoPaginatorModel = VideoPaginatorModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

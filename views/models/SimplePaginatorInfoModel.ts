import { Instance } from "mobx-state-tree"
import { SimplePaginatorInfoModelBase } from "./SimplePaginatorInfoModel.base"

/* The TypeScript type of an instance of SimplePaginatorInfoModel */
export interface SimplePaginatorInfoModelType extends Instance<typeof SimplePaginatorInfoModel.Type> {}

/* A graphql query fragment builders for SimplePaginatorInfoModel */
export { selectFromSimplePaginatorInfo, simplePaginatorInfoModelPrimitives, SimplePaginatorInfoModelSelector } from "./SimplePaginatorInfoModel.base"

/**
 * SimplePaginatorInfoModel
 *
 * Pagination information about the corresponding list of items.
 */
export const SimplePaginatorInfoModel = SimplePaginatorInfoModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

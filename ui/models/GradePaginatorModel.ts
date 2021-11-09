import { Instance } from "mobx-state-tree"
import { GradePaginatorModelBase } from "./GradePaginatorModel.base"

/* The TypeScript type of an instance of GradePaginatorModel */
export interface GradePaginatorModelType extends Instance<typeof GradePaginatorModel.Type> {}

/* A graphql query fragment builders for GradePaginatorModel */
export { selectFromGradePaginator, gradePaginatorModelPrimitives, GradePaginatorModelSelector } from "./GradePaginatorModel.base"

/**
 * GradePaginatorModel
 *
 * A paginated list of Grade items.
 */
export const GradePaginatorModel = GradePaginatorModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

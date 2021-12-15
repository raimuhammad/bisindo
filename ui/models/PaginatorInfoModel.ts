import { Instance } from "mobx-state-tree";
import { PaginatorInfoModelBase } from "./PaginatorInfoModel.base";

/* The TypeScript type of an instance of PaginatorInfoModel */
export type PaginatorInfoModelType = Instance<typeof PaginatorInfoModel.Type>;

/* A graphql query fragment builders for PaginatorInfoModel */
export {
  selectFromPaginatorInfo,
  paginatorInfoModelPrimitives,
  PaginatorInfoModelSelector,
} from "./PaginatorInfoModel.base";

/**
 * PaginatorInfoModel
 *
 * Pagination information about the corresponding list of items.
 */
export const PaginatorInfoModel = PaginatorInfoModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self));
  },
}));

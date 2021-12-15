import { Instance } from "mobx-state-tree";
import { DiscussionPaginatorModelBase } from "./DiscussionPaginatorModel.base";

/* The TypeScript type of an instance of DiscussionPaginatorModel */
export type DiscussionPaginatorModelType = Instance<
  typeof DiscussionPaginatorModel.Type
>;

/* A graphql query fragment builders for DiscussionPaginatorModel */
export {
  selectFromDiscussionPaginator,
  discussionPaginatorModelPrimitives,
  DiscussionPaginatorModelSelector,
} from "./DiscussionPaginatorModel.base";

/**
 * DiscussionPaginatorModel
 *
 * A paginated list of Discussion items.
 */
export const DiscussionPaginatorModel = DiscussionPaginatorModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self));
    },
  })
);

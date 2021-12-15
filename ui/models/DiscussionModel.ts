import { Instance } from "mobx-state-tree";
import { DiscussionModelBase } from "./DiscussionModel.base";

/* The TypeScript type of an instance of DiscussionModel */
export type DiscussionModelType = Instance<typeof DiscussionModel.Type>;

/* A graphql query fragment builders for DiscussionModel */
export {
  selectFromDiscussion,
  discussionModelPrimitives,
  DiscussionModelSelector,
} from "./DiscussionModel.base";

/**
 * DiscussionModel
 */
export const DiscussionModel = DiscussionModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self));
  },
}));

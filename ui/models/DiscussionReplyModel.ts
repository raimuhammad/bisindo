import { Instance } from "mobx-state-tree";
import { DiscussionReplyModelBase } from "./DiscussionReplyModel.base";

/* The TypeScript type of an instance of DiscussionReplyModel */
export type DiscussionReplyModelType = Instance<
  typeof DiscussionReplyModel.Type
>;

/* A graphql query fragment builders for DiscussionReplyModel */
export {
  selectFromDiscussionReply,
  discussionReplyModelPrimitives,
  DiscussionReplyModelSelector,
} from "./DiscussionReplyModel.base";

/**
 * DiscussionReplyModel
 */
export const DiscussionReplyModel = DiscussionReplyModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self));
    },
  })
);

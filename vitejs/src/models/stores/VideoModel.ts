import { Instance } from "mobx-state-tree";
import { VideoModelBase } from "./VideoModel.base";
import { getDurationTimeText } from "utils/get-duration-time";

/* The TypeScript type of an instance of VideoModel */
export interface VideoModelType extends Instance<typeof VideoModel.Type> {}

/* A graphql query fragment builders for VideoModel */
export {
  selectFromVideo,
  videoModelPrimitives,
  VideoModelSelector,
} from "./VideoModel.base";

/**
 * VideoModel
 */
export const VideoModel = VideoModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self));
  },
})).views((model) => ({
  get durationText() {
    return getDurationTimeText(model.duration ?? 0);
  },
}));

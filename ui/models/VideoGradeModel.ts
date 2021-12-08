import { Instance } from "mobx-state-tree"
import { VideoGradeModelBase } from "./VideoGradeModel.base"

/* The TypeScript type of an instance of VideoGradeModel */
export interface VideoGradeModelType extends Instance<typeof VideoGradeModel.Type> {}

/* A graphql query fragment builders for VideoGradeModel */
export { selectFromVideoGrade, videoGradeModelPrimitives, VideoGradeModelSelector } from "./VideoGradeModel.base"

/**
 * VideoGradeModel
 */
export const VideoGradeModel = VideoGradeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

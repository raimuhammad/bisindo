import { Instance } from "mobx-state-tree"
import { GradeModelBase } from "./GradeModel.base"

/* The TypeScript type of an instance of GradeModel */
export interface GradeModelType extends Instance<typeof GradeModel.Type> {}

/* A graphql query fragment builders for GradeModel */
export { selectFromGrade, gradeModelPrimitives, GradeModelSelector } from "./GradeModel.base"

/**
 * GradeModel
 */
export const GradeModel = GradeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

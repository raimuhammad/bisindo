import { Instance } from "mobx-state-tree"
import { StudentGradePaginatorModelBase } from "./StudentGradePaginatorModel.base"

/* The TypeScript type of an instance of StudentGradePaginatorModel */
export interface StudentGradePaginatorModelType extends Instance<typeof StudentGradePaginatorModel.Type> {}

/* A graphql query fragment builders for StudentGradePaginatorModel */
export { selectFromStudentGradePaginator, studentGradePaginatorModelPrimitives, StudentGradePaginatorModelSelector } from "./StudentGradePaginatorModel.base"

/**
 * StudentGradePaginatorModel
 *
 * A paginated list of StudentGrade items.
 */
export const StudentGradePaginatorModel = StudentGradePaginatorModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

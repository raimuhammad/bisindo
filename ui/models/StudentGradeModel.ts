import { Instance } from "mobx-state-tree";
import { StudentGradeModelBase } from "./StudentGradeModel.base";

/* The TypeScript type of an instance of StudentGradeModel */
export interface StudentGradeModelType
  extends Instance<typeof StudentGradeModel.Type> {}

/* A graphql query fragment builders for StudentGradeModel */
export {
  selectFromStudentGrade,
  studentGradeModelPrimitives,
  StudentGradeModelSelector,
} from "./StudentGradeModel.base";

/**
 * StudentGradeModel
 */
export const StudentGradeModel = StudentGradeModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self));
  },
})).views((self) => ({
  get studentName() {
    if (self.student) {
      return self.student.name as string;
    }
    return "";
  },
  get gradeName() {
    if (self.grade) {
      return self.grade.name as string;
    }
    return "";
  },
}));
import { useStudentInfo } from "./use-student-info";
import { createContext, useContext } from "react";
import { useStudentGrade } from "./use-student-grade";
import { useStudentVideo } from "./use-student-video";

export function useStudentContext() {
  const progressInfo = useStudentInfo();
  const gradeInfo = useStudentGrade();
  const videoList = useStudentVideo(gradeInfo);
  const isPageLoading = [
    progressInfo.loading,
    gradeInfo.loading,
    videoList.loading,
  ].find(Boolean);
  return {
    progressInfo,
    videoList,
    gradeInfo,
    isPageLoading: Boolean(isPageLoading),
  };
}
type UseStudent = ReturnType<typeof useStudentContext>;
export const StudentContext = createContext<null | UseStudent>(null);
export function useStudent() {
  return useContext(StudentContext) as UseStudent;
}

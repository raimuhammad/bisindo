import { RootStoreType, StudentGradeModelType, useQuery } from "@root/models";

export function useStudentGrade() {
  const { loading, data } = useQuery<{
    gradeByAuth: StudentGradeModelType;
  }>((store: RootStoreType) => {
    return store.queryGradeByAuth({}, (s) =>
      s.id.grade((s) => s.id.name.video_count)
    );
  });
  return {
    studentGrade: (data
      ? data.gradeByAuth
      : null) as unknown as StudentGradeModelType,
    loading: !data || loading,
  };
}

export type UseStudentGrade = ReturnType<typeof useStudentGrade>;

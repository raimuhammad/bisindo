import { paginatorFactory } from "../paginator-factory";
import { RootStoreBaseQueries } from "@root-model";
import { StudentGradeModelSelector, StudentGradeModelType } from "@root/models";

const useInitial = () => {
  return {
    first: 10,
  };
};

export const paginatorProvider = paginatorFactory<StudentGradeModelType>({
  getInitial: useInitial,
  queryKey: RootStoreBaseQueries.queryStudents,
  modelBuilder(instance: StudentGradeModelSelector): typeof instance {
    return instance.id
      .student((i) => i.id.name.email.active)
      .grade((i) => i.id.name);
  },
});

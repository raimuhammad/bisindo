import type { IPaginatorOf } from "./paginator-factory";
import { paginatorFactory } from "./paginator-factory";
import type { GradeModelType, StudentGradeModelType } from "@root/models";
import {
  gradeModelPrimitives,
  paginatorInfoModelPrimitives,
  StudentGradeModelSelector,
  StudentGradePaginatorModelSelector,
  userModelPrimitives,
} from "@root/models";
import { RootStoreBaseQueries } from "@models/RootStore.base";
import { createContext, PropsWithChildren, useContext } from "react";
import { observer } from "mobx-react";

type UseIPaginatorOf<T> = (includes?: Record<string, any>) => IPaginatorOf<T>;

export const paginators = {
  grades: paginatorFactory(
    RootStoreBaseQueries.queryGrades,
    gradeModelPrimitives
  ) as UseIPaginatorOf<GradeModelType>,
  students: paginatorFactory(
    RootStoreBaseQueries.queryStudents,
    (v: StudentGradeModelSelector) =>
      v.id.student(userModelPrimitives).grade((v) => v.id.name)
  ) as UseIPaginatorOf<StudentGradeModelType>,
};

const PaginatorContext = createContext<null | IPaginatorOf<any>>(null);

export function usePaginator<T = any>() {
  return useContext(PaginatorContext) as IPaginatorOf<T>;
}

type P = {
  dataKey: keyof typeof paginators;
  includes?: Record<string, any>;
};

export const PaginatorProvider = observer(
  ({ dataKey, includes = {}, children }: PropsWithChildren<P>) => {
    const callback = paginators[dataKey];
    if (!callback) {
      throw new Error(`Paginator for ${dataKey} is not defined`);
    }
    const contextValue = callback(includes);
    return (
      <PaginatorContext.Provider value={contextValue}>
        {children}
      </PaginatorContext.Provider>
    );
  }
);

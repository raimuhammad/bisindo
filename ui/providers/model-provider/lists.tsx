import { IListResultOf, listFactory } from "./list-factory";
import type {
  QuizModelType,
  StudentGradeModelType,
  VideoModelType,
} from "@root/models";
import { RootStoreBaseQueries } from "@root-model";
import { observer } from "mobx-react";
import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

export type { IListResultOf } from "./list-factory";
/**
 * Ambil data video berdasarkan batch
 */
const useVideoByGrade = listFactory<VideoModelType, { gradeId: any }>(
  RootStoreBaseQueries.queryVideoByGrade
);

const lists = {
  videoByGrade: useVideoByGrade,
  studentByGrade: listFactory<StudentGradeModelType, { gradeId: any }>(
    RootStoreBaseQueries.queryStudents
  ),
};

type ListProps = {
  dataKey: keyof typeof lists;
  props?: Record<string, any>;
};

const Context = createContext<null | IListResultOf<any>>(null);

export function useList<T>(): IListResultOf<T> {
  return useContext(Context) as IListResultOf<T>;
}

export const List = observer(
  ({ dataKey, props = {}, children }: PropsWithChildren<ListProps>) => {
    const useProvider = lists[dataKey](props as any);
    return <Context.Provider value={useProvider}>{children}</Context.Provider>;
  }
);

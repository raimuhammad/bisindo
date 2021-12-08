import type { IPaginatorOf } from "./paginator-factory";
import { paginatorFactory } from "./paginator-factory";
import type {
  GradeModelType,
  StudentGradeModelType,
  VideoModelType,
} from "@root/models";
import {
  DiscussionModelSelector,
  gradeModelPrimitives,
  QuizModelSelector,
  QuizModelType,
  StudentGradeModelSelector,
  userModelPrimitives,
} from "@root/models";
import { RootStoreBaseQueries } from "@models/RootStore.base";
import { createContext, PropsWithChildren, useContext } from "react";
import { observer } from "mobx-react";
import { listFactory } from "@providers/model-provider/list-factory";

type UseIPaginatorOf<T> = (includes?: Record<string, any>) => IPaginatorOf<T>;

export const paginators = {
  quizByVideo: paginatorFactory(
    RootStoreBaseQueries.queryQuizes,
    (selector: QuizModelSelector) => {
      return selector
        .show_at.id.type.additional_image.question.questionAnswer.image_matcher.choises(
        (c) => c.id.image.text.index
      );
    }
  ) as UseIPaginatorOf<VideoModelType>,
  grades: paginatorFactory(
    RootStoreBaseQueries.queryGrades,
    gradeModelPrimitives
  ) as UseIPaginatorOf<GradeModelType>,
  students: paginatorFactory(
    RootStoreBaseQueries.queryStudents,
    (v: StudentGradeModelSelector) =>
      v.id.student(userModelPrimitives).grade((v) => v.id.name)
  ) as UseIPaginatorOf<StudentGradeModelType>,
  discussion: paginatorFactory(
    RootStoreBaseQueries.queryDiscussion,
    (v: DiscussionModelSelector) => {
      return v.id.content.created_at.user_id
        .user((u) => u.name.id)
        .replies(
          (r) => r.user_id.id.user((u) => u.name).content.user_id.created_at
        );
    }
  ),
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

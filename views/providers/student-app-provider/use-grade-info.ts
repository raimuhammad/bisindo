import { useFetchQuery } from "@hooks/use-fetch-query";
import { StudentGradeModelSelector, StudentGradeModelType } from "@root/models";
import { RootStoreBaseQueries } from "@root-model";
import * as React from "react";

export const useUserGradeInfo = () => {
  const [result, { loading, fetch }] = useFetchQuery<StudentGradeModelType>({
    queryKey: RootStoreBaseQueries.queryGradeByAuth,
    builder(instance: StudentGradeModelSelector) {
      return instance.grade((i) => {
        return i.id.name
          .videos(
            (v) => v.id.content.description.title.duration.caption.thumbnail
          )
          .students((s) => s.student((u) => u.name.name));
      });
    },
  });
  React.useEffect(() => {
    fetch({});
  }, []);
  return { result, loading };
};

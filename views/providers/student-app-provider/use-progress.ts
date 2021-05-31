import * as React from "react";
import { ProgressModelType } from "@root/models";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";

export const useProvideProgress = () => {
  const [progress, setProgress] = React.useState<null | ProgressModelType>(
    null
  );
  const [progressFetch, { fetch }] = useFetchQuery<ProgressModelType>({
    queryKey: RootStoreBaseQueries.queryProgress,
  });
  React.useEffect(() => {
    fetch({});
  }, []);

  React.useEffect(() => {
    if (progressFetch) {
      setProgress(progressFetch);
    }
  }, [progressFetch]);

  return {
    progress,
    refresh: () => fetch(),
  };
};

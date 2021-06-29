import { useApp } from "@providers/app-provider";
import { ProgressModelType, UserModelType } from "@root/models";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { useEffect } from "react";

export function useFetchProgress(): [ProgressModelType | null, boolean] {
  const app = useApp();
  const user = app.user as UserModelType;

  const [progress, { fetch, loading }] = useFetchQuery<ProgressModelType>({
    queryKey: RootStoreBaseQueries.queryProgress,
  });

  useEffect(() => {
    fetch({
      user_id: user.id,
    });
  }, []);

  return [progress, loading];
}

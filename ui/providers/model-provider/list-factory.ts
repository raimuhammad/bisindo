import { RootStoreBaseQueries } from "@root-model";
import { useQuery } from "@model";
import { parseMutationQuerykey } from "./utils";
import { useEffect } from "react";

export type IListResultOf<T> = {
  data: T[];
  loading: boolean;
  isEmpty: boolean;
  fetch(): void;
  hasResponse: boolean;
};

function useList<T, Props extends Record<string, any> = any>(
  api: RootStoreBaseQueries,
  props: Props,
  selector?: (v: any) => any
): IListResultOf<T> {
  const resultKey = parseMutationQuerykey(api);
  const { data, setQuery, loading } = useQuery<Record<string, T[]>>();
  const fetch = () => {
    setQuery((root: any) => {
      return root[api](props, selector);
    });
  };
  useEffect(() => {
    fetch();
  }, []);

  const resolveData = (): T[] => {
    return data ? data[resultKey] : [];
  };
  const isEmpty = () => {
    if (loading) {
      return false;
    }
    const isDataDefine = data && data[resultKey];
    if (isDataDefine) {
      return isDataDefine.length === 0;
    }
    return false;
  };

  return {
    data: resolveData(),
    isEmpty: isEmpty(),
    loading,
    fetch,
    hasResponse: Boolean(data),
  };
}

export function listFactory<T, P>(
  api: RootStoreBaseQueries
): (p: P, s?: (v: any) => void) => IListResultOf<T> {
  return (props: P, s): IListResultOf<T> => {
    return useList<T, P>(api, props, s);
  };
}

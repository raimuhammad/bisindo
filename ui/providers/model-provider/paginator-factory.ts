import { PaginatorInfoModelSelector, useQuery } from "@root/models";
import type { PaginatorInfoModelType } from "@root/models";
import type { RootStoreBaseQueries } from "@root/models/RootStore.base";
import type { SnapshotOut } from "mobx-state-tree";
import { useCallback, useState } from "react";
import { parseMutationQuerykey } from "./utils";

interface PaginatorResult<T> {
  data: T[];
  paginator: SnapshotOut<PaginatorInfoModelType>;
}

function resolveData(response: any): PaginatorResult<any> {
  if (response) {
    return {
      data: response.data,
      paginator: response.paginatorInfo,
    };
  }
  return {
    data: [],
    paginator: {
      perPage: 10,
      currentPage: 0,
      count: 0,
      lastPage: 0,
      lastItem: 0,
      firstItem: 0,
      hasMorePages: false,
      total: 0,
      __typename: "PaginatorInfo",
    },
  };
}

const useFetch = (api: RootStoreBaseQueries, selector: any) => {
  const resultKey = parseMutationQuerykey(api);
  const { data, loading, setQuery } = useQuery<any>();
  const fetch = (queries: Record<string, any>) => {
    return setQuery((store: any) => {
      return store[api](queries, (select: any) => {
        return select
          .data(selector)
          .paginatorInfo(
            new PaginatorInfoModelSelector().currentPage.hasMorePages.lastPage
              .perPage.count.total.lastItem.firstItem
          );
      });
    });
  };
  const result = resolveData(data && data[resultKey] ? data[resultKey] : null);
  return {
    result,
    fetch,
    loading,
    hasResponse: Boolean(data),
  };
};

type Options = {
  api: RootStoreBaseQueries;
  includeQuery: Record<string, any>;
  selector: any;
};

type QueryActionProps = {
  include: Record<string, any>;
  callback(q: Record<string, any>): void;
  paginator: SnapshotOut<PaginatorInfoModelType>;
  merge: Record<string, any>;
};

const useQueryParameter = ({
  include,
  callback,
}: Omit<QueryActionProps, "paginator" | "merge">) => {
  const [parameter, setParameter] = useState(include);
  const updateParam = (name: string) => {
    return (value: any) => {
      const state = {
        ...parameter,
        [name]: value,
      };
      setParameter({ ...state });
      callback({ ...state, page: 1, first: 10 });
    };
  };
  const removeParam = (name: string) => {
    let arg: Record<string, any> = {};
    setParameter((current) => {
      delete current[name];
      arg = current;
      return { ...current };
    });
    callback({
      ...arg,
      page: 1,
      first: 10,
    });
  };
  return {
    updateParameter: updateParam,
    removeParam,
    parameter,
  };
};

const useQueryAction = ({
  callback,
  paginator,
  merge,
}: Omit<QueryActionProps, "include">) => {
  const go = useCallback(
    (page: number, first: number) => {
      callback({
        ...merge,
        page,
        first,
      });
    },
    [merge]
  );
  const next = () => go((paginator.currentPage as number) + 1, 10);
  const prev = () => go((paginator.currentPage as number) + 1, 10);
  return {
    go,
    next,
    prev,
  };
};

function usePaginatorService<T>({ includeQuery, api, selector }: Options) {
  const { fetch, loading, result, hasResponse } = useFetch(api, selector);
  const { parameter, updateParameter, removeParam } = useQueryParameter({
    include: includeQuery,
    callback: fetch,
  });
  const action = useQueryAction({
    callback: fetch,
    paginator: result.paginator,
    merge: parameter,
  });
  const initialFetch = useCallback(() => {
    fetch({ page: 1, first: 10, ...includeQuery });
  }, [includeQuery]);
  const isEmpty = hasResponse && result.data.length === 0;
  return {
    result,
    actions: {
      ...action,
      updateParameter,
      parameter,
      removeParam,
    },
    loading,
    initialFetch,
    isEmpty,
    hasResponse,
  };
}

export interface IPaginatorOf<T> {
  result: PaginatorResult<T>;
  actions: ReturnType<typeof useQueryParameter> &
    ReturnType<typeof useQueryAction>;
  loading: boolean;
  hasResponse: boolean;
  initialFetch(): void;
  isEmpty: boolean;
}

export function paginatorFactory<T>(api: RootStoreBaseQueries, selector: any) {
  return (include: Record<string, any> = {}): IPaginatorOf<T> =>
    usePaginatorService<T>({
      includeQuery: include,
      api,
      selector,
    }) as IPaginatorOf<T>;
}

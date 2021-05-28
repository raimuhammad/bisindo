import { RootStoreBaseQueries } from "@root-model";
import { createContext, useContext, useEffect, useState } from "react";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { PaginatorInfoModelSelector, PaginatorInfoModelType } from "@model";
import { paginator } from "@root/app";
import { uniqBy } from "lodash";

const DefaultPaginator = paginator.defaultPaginator;
const DefaultInput = paginator.defaultInput;

type PageHandlerOpt = {
  current: Application.PaginatorInput;
  paginator?: PaginatorInfoModelType;
  setter(v: Application.PaginatorInput<any>): void;
};

function usePageHandler({
  current,
  setter,
  paginator = DefaultPaginator,
}: PageHandlerOpt) {
  const { currentPage } = paginator;
  const go = (page: number) => {
    setter({ ...current, page });
  };
  const next = () => {
    go((currentPage as number) + 1);
  };
  const prev = () => {
    go((currentPage as number) - 1);
  };
  const changePerPage = (first: number) => {
    setter({ ...current, page: 1, first });
  };
  return {
    go,
    next,
    prev,
    changePerPage,
    prevDisabled: paginator?.currentPage === 1,
    nextDisabled: paginator?.lastPage === paginator?.currentPage,
  };
}

export interface UsePaginator<
  T,
  V extends Record<string, any> = Record<string, any>
> {
  go(n: number): void;
  next(): void;
  prev(): void;
  changePerPage(n: number): void;
  updateVars(variables: Partial<V>): void;
  reset(): void;
  loading: boolean;
  paginator: PaginatorInfoModelType;
  data: T[];
  nextDisabled: boolean;
  prevDisabled: boolean;
}

type ResRef<T> = {
  data: T[];
  paginatorInfo: PaginatorInfoModelType;
};
export type Opt<Var> = {
  queryKey: RootStoreBaseQueries;
  initial?: Partial<Var>;
  modelBuilder(instance: any): typeof instance;
  keepResult?: boolean;
};

export function usePaginator<
  T,
  CustomVar extends Record<string, any> = Record<string, any>
>({ queryKey, modelBuilder, initial, keepResult = false }: Opt<CustomVar>) {
  const [items, setItems] = useState<T[]>([]);

  const v = ({
    ...DefaultInput,
    ...initial,
  } as unknown) as Application.PaginatorInput<CustomVar>;

  const [paginatorInput, setPaginatorInput] = useState<
    Application.PaginatorInput<CustomVar>
  >(() => {
    return v;
  });

  const builder = (instance: any) => {
    return instance
      .data(modelBuilder)
      .paginatorInfo((instance: PaginatorInfoModelSelector) => {
        return instance.total.currentPage.perPage.lastPage.hasMorePages.lastItem
          .count;
      });
  };

  const [result, { fetch, loading }] = useFetchQuery<ResRef<T>>({
    queryKey,
    builder,
  });

  useEffect(() => {
    if (keepResult && result) {
      setItems(uniqBy([...items, ...(result.data as Array<T>)], "id"));
    }
  }, [result]);

  const reset = () => fetch(v);

  useEffect(() => {
    fetch({ ...paginatorInput });
  }, [paginatorInput]);

  const pageHandler = usePageHandler({
    paginator: (result
      ? result.paginatorInfo
      : DefaultPaginator) as PaginatorInfoModelType,
    current: paginatorInput,
    setter: setPaginatorInput,
  });

  const updateVars = (vars: Partial<CustomVar>) => {
    const argslist = vars;
    const current = paginatorInput;
    Object.keys(vars).forEach((k) => {
      if (typeof vars[k] === "undefined") {
        delete argslist[k];
        delete current[k];
      }
    });
    setPaginatorInput({
      ...current,
      ...argslist,
      page: 1,
    });
    if (keepResult) {
      setItems([]);
    }
  };

  const getData = () => {
    if (keepResult) return items;
    return result?.data ?? [];
  };

  return {
    ...pageHandler,
    updateVars,
    reset,
    loading,
    data: getData(),
    paginator: result?.paginatorInfo ?? DefaultPaginator,
  };
}

export const PaginatorProvider = createContext<null | ReturnType<
  typeof usePaginator
>>(null);

export function usePaginatorContext<
  T extends Record<string, any>,
  CustomVar extends Record<string, any> = Record<string, any>
>(): UsePaginator<T, CustomVar> {
  return useContext(PaginatorProvider) as UsePaginator<T, CustomVar>;
}

import { RootStoreBaseQueries } from "root-model";
import {
  PaginatorInfoModelSelector,
  PaginatorInfoModelType,
  useQuery,
} from "root/models/stores";
import voca from "voca";
import { useEffect } from "react";

const initialPaginator: PaginatorInfoModelType = {
  count: 0,
  perPage: 10,
  lastPage: 0,
  currentPage: 0,
  hasMorePages: false,
  lastItem: null,
  firstItem: null,
  total: 0,
} as PaginatorInfoModelType;

type Result<T> = {
  data: T[];
  paginatorInfo: PaginatorInfoModelType;
  loading: boolean;
};
type Action = {
  next(): void;
  prev(): void;
  go(n: number): void;
};

type UsePaginate<T> = [Result<T>, Action];

type Options = {
  readOnlyVar?: Record<string, any>;
  queryKey: RootStoreBaseQueries;
  selector(instance: any): typeof instance;
};

/**
 * fungsi untuk mengambil data secara paginasi
 * @param readOnlyVar
 * @param queryKey
 * @param selector
 */

export function usePaginate<T>({
  readOnlyVar = {},
  queryKey,
  selector,
}: Options): UsePaginate<T> {
  const resultKey = voca(queryKey).replace("query", "").camelCase().value();

  const { data, loading, setQuery } = useQuery<any>();

  const fetch = (vars: Record<string, any>) => {
    return setQuery((model: RootModel) => {
      console.log(vars);
      return model[queryKey](
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        { ...vars, ...readOnlyVar, first: 10 },
        (instance: any) => {
          return instance
            .data(selector)
            .paginatorInfo(
              (p: PaginatorInfoModelSelector) =>
                p.count.currentPage.perPage.lastPage.lastItem.firstItem
                  .hasMorePages.total
            );
        }
      );
    });
  };
  const getData = (): Omit<Result<T>, "loading"> => {
    if (!data || !data[resultKey]) {
      return { data: [], paginatorInfo: initialPaginator };
    }
    return data[resultKey];
  };

  const goPage = (page: number) => {
    const {
      paginatorInfo: { lastPage },
    } = getData();
    if (page <= (lastPage as number)) {
      return fetch({ page });
    }
  };

  useEffect(() => {
    fetch({
      first: 10,
      page: 1,
    });
  }, []);

  const next = () => {
    const {
      paginatorInfo: { hasMorePages, currentPage },
    } = getData();
    if (hasMorePages) {
      return goPage((currentPage as number) + 1);
    }
  };
  const prev = () => {
    const {
      paginatorInfo: { currentPage },
    } = getData();
    if (currentPage !== 1) {
      return goPage((currentPage as number) - 1);
    }
  };
  return [
    {
      ...getData(),
      loading,
    },
    {
      next,
      prev,
      go: goPage,
    },
  ];
}

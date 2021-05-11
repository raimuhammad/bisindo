import { RootStoreBaseQueries } from "root-model";
import voca from "voca";
import { useQuery } from "root/models/stores";

type Options<T> = {
  queryKey: RootStoreBaseQueries;
  initialValue?: T | null;
};
type Result<T, V extends Record<string, any> = Record<string, any>> = {
  data: T | null;
  fetch(v?: V): void;
  loading: boolean;
};

export function useFetchQuery<
  T,
  V extends Record<string, any> = Record<string, any>
>({ queryKey, initialValue = null }: Options<T>): Result<T, V> {
  const result = voca(queryKey).replace("query", "").camelCase().value();
  type Ref = {
    [K in typeof result]: T;
  };
  const { setQuery, data, loading } = useQuery<Ref>();
  const fetch = (vars: V = {} as V) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return setQuery((model: RootModel) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return model[queryKey](vars);
    });
  };
  const getData = () => {
    if (!data) {
      return initialValue ? initialValue : null;
    }
    return data[result];
  };
  return {
    data: getData(),
    loading,
    fetch,
  };
}

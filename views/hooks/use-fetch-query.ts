/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RootStoreBaseQueries } from "@root-model";
import voca from "voca";
import { useQuery } from "@model";
import { useEffect, useState } from "react";

export type Options<T> = {
  queryKey: RootStoreBaseQueries;
  initialValue?: T | null;
  builder?(instance: any): typeof instance;
};
type Result<T, V extends Record<string, any> = Record<string, any>> = [
  T | null,
  {
    fetch(v?: V): void;
    loading: boolean;
    isNull: boolean;
  }
];

export function useFetchQuery<
  T,
  V extends Record<string, any> = Record<string, any>
>({ queryKey, builder }: Options<T>): Result<T, V> {
  const result = voca(queryKey).replace("query", "").camelCase().value();
  const [fetchResult, setResult] = useState<T | null>(null);
  const { setQuery, data, loading, error } = useQuery<any>();
  useEffect(() => {
    if (data && data[result]) {
      const val = data[result];
      setResult(val);
    }
  }, [data]);

  const fetch = (vars: V = {} as V) => {
    return setQuery((model: RootModel) => {
      // @ts-ignore
      return model[queryKey](vars, builder);
    });
  };
  const isNull = (): boolean => {
    if (typeof error != "undefined") {
      return Boolean(error?.response?.data[result] === null);
    }
    return false;
  };
  return [
    fetchResult,
    {
      loading,
      fetch,
      isNull: isNull(),
    },
  ];
}

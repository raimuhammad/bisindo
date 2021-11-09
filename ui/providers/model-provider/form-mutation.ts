import type { RootStoreBaseMutations } from "@root-model";
import type { ObjectSchema } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@root/models";
import { parseMutationQuerykey } from "./utils";
import { useCallback } from "react";

type Options = {
  api: RootStoreBaseMutations;
  rule: ObjectSchema<any>;
  merge: Record<string, any>;
  parser?(v: any): any;
};

function formMutation<T = any>({
  api,
  rule,
  parser,
  merge = {},
}: Options): IFormMutationOf<T> {
  const form = useForm({
    resolver: yupResolver(rule),
  });
  const resultKey = parseMutationQuerykey(api);
  const { data, loading, setQuery } = useQuery<Record<typeof resultKey, T>>();

  const formCallback = useCallback((data: Record<string, any>) => {
    return setQuery((root: any) => {
      const dt = parser ? parser({ ...data, ...merge }) : { ...data, ...merge };
      return root[api](dt);
    });
  }, []);
  const handler = form.handleSubmit(formCallback);
  const reset = useCallback(() => {
    form.reset({});
  }, []);
  const setFormValue = useCallback((values: Record<string, any>) => {
    Object.values((key: any) => {
      form.setValue(key, values[key]);
    });
  }, []);

  return {
    response: data && data[resultKey] ? data[resultKey] : null,
    form,
    setFormValue,
    reset,
    loading,
    handler,
  };
}

export interface IFormMutationOf<T> {
  response: T | null;
  form: ReturnType<typeof useForm>;
  loading: boolean;
  setFormValue(v: Record<string, any>): void;
  reset(): void;
  handler(): void;
}

export function formMutationfactory<T>({
  api,
  rule,
}: Omit<Options, "merge" | "parser">) {
  return (merge: Record<string, any> = {}, parser?: (v: any) => any) =>
    formMutation<T>({ api, rule, merge, parser });
}

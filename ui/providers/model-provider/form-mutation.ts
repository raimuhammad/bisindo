import type { RootStoreBaseMutations } from "@root-model";
import type { ObjectSchema } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@root/models";
import { parseMutationQuerykey } from "./utils";
import { useCallback, useState } from "react";

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
  const { data, store } = useQuery<Record<typeof resultKey, T>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formResult, setFormResult] = useState<{
    response: null | T;
  }>({
    response: null,
  });
  const formCallback = useCallback(
    (data: Record<string, any>) => {
      setError(false);
      setFormResult({
        response: null,
      });
      const dt = parser ? parser({ ...data, ...merge }) : { ...data, ...merge };
      setLoading(true);
      return (store as any)
        [api](dt)
        .currentPromise()
        .then((response: any) => {
          setLoading(false);
          if (response && response[resultKey]) {
            setFormResult({ response });
          }
          setError(false);
        })
        .catch(() => {
          console.log("Error");
          setError(true);
          setLoading(false);
        });
    },
    [api]
  );
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
    response: formResult.response,
    form,
    setFormValue,
    reset,
    loading,
    handler,
    error,
  };
}

export interface IFormMutationOf<T> {
  response: T | null;
  form: ReturnType<typeof useForm>;
  loading: boolean;
  setFormValue(v: Record<string, any>): void;
  reset(): void;
  handler(): void;
  error: any;
}

export function formMutationfactory<T>({
  api,
  rule,
}: Omit<Options, "merge" | "parser">) {
  return (merge: Record<string, any> = {}, parser?: (v: any) => any) =>
    formMutation<T>({ api, rule, merge, parser });
}

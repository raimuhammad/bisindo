import { FC, PropsWithChildren, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RootStoreBaseMutations } from "root-model";
import { resolverFactory } from "utils/resolver-factory";
import { useQuery } from "root/models/stores";
import { ValidationResponse } from "utils/validation-response";
import voca from "voca";

export type Instance<T> = {
  result: T | null;
  Provider: FC<PropsWithChildren<any>>;
  form: ReturnType<typeof useForm>;
  handler(e: any): any;
  invoke(data: any): void;
  loading: boolean;
};

interface Form<T extends Record<string, any> = Record<string, any>> {
  resultKey: RootStoreBaseMutations;
  callback(data: any): (store: RootModel) => any;
  resolver: ReturnType<typeof resolverFactory>;
  instance(): Instance<T>;
}

export type FormBaseProps = {
  callback: Form["callback"];
  resolver: Form["resolver"];
  resultKey: Form["resultKey"];
  initialValues?: Record<string, any>;
};

export class FormBase<T> {
  callback: Form["callback"];
  resolver: Form["resolver"];
  resultKey: Form["resultKey"];
  initialValues: Record<string, any> = {};

  constructor({ callback, resolver, resultKey, initialValues }: FormBaseProps) {
    this.instance = this.instance.bind(this);
    this.callback = callback;
    this.resolver = resolver;
    this.resultKey = resultKey;
    this.initialValues = initialValues ?? {};
  }

  instance() {
    const { callback, resolver, resultKey, initialValues } = this;
    const { setQuery, data, loading, error } = useQuery();
    const form = useForm({
      resolver,
      defaultValues: initialValues,
    });
    const errorInstance = ValidationResponse.fromErrorObject(error);
    useEffect(() => {
      if (errorInstance) {
        errorInstance.makeFieldError(form);
      }
    }, [errorInstance]);
    const invoke = (data: any) => setQuery(callback(data));
    const handler = form.handleSubmit(invoke);
    const getResult = (): null | T => {
      const k = voca(resultKey)
        .replaceAll("mutate", "")
        .decapitalize()
        .value() as keyof typeof data;
      if (data && typeof data[k] !== null) {
        return data[k] as T;
      }
      return null;
    };
    return {
      handler,
      form,
      result: getResult(),
      loading,
      invoke,
    };
  }
}

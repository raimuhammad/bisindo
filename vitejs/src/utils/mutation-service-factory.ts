/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RootStoreBaseMutations } from "root-model";
import { AnySchema } from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import { createElement, useCallback, useEffect, useState } from "react";
import { useQuery } from "root/models/stores";
import voca from "voca";

type Options<
  T,
  MutateKey extends RootStoreBaseMutations,
  Input extends Record<string, any>
> = {
  mutation: MutateKey;
  schema: Partial<Record<keyof T | keyof Input, AnySchema>>;
};

function formUtils<In>(
  schema: Options<any, any, any>["schema"],
  resolver: (data: any) => void,
  initialValues: Record<string, any> = {}
) {
  const [formSchema, setFormSchema] = useState<typeof schema>(schema);
  const form = useForm({
    // @ts-ignore
    resolver: yupResolver(object(formSchema)),
    defaultValues: initialValues,
  });
  const setFormValue = (value: Partial<In>) => {
    Object.keys(value).forEach((key) => {
      form.setValue(key, value[key as keyof In]);
    });
  };

  const handler = form.handleSubmit(resolver);
  const provider = useCallback(
    (props: any) =>
      createElement(FormProvider, {
        ...props,
        ...form,
      }),
    []
  );
  return {
    form,
    handler,
    provider,
    setFormValue,
    updateSchema: setFormSchema,
  };
}

type PreOption<In, MutateKey> = {
  initialValue?: Partial<In>;
  mutation?: MutateKey;
  injectInput?: Record<string, any>;
  inputParser?: (input: In) => Partial<In>;
};

export function mutationServiceFactory<
  T,
  MutateKey extends RootStoreBaseMutations,
  Input extends Record<string, any> = Record<string, any>
>({ schema, mutation: preDefinedMutation }: Options<T, MutateKey, Input>) {
  return ({
    initialValue = {},
    mutation = preDefinedMutation,
    injectInput = {},
    inputParser,
  }: PreOption<Input, MutateKey>) => {
    const [mutateKey, setMutateKey] = useState<MutateKey>(mutation);
    const { data, setQuery, loading } = useQuery();
    const resultKey = voca(mutateKey)
      .replaceAll("mutate", "")
      .camelCase()
      .value();
    const getData = (): T | undefined => {
      if (!data) {
        return undefined;
      }
      return data[resultKey as keyof typeof data] as T;
    };
    const resolver = useCallback(
      (data: any) => {
        console.log(injectInput);
        let args = {
          ...data,
          ...injectInput,
        };
        if (inputParser) {
          args = inputParser(args);
        }
        return setQuery((model: RootModel) => model[mutateKey](args));
      },
      [injectInput, mutateKey]
    );

    const utils = formUtils<Input>(schema, resolver, initialValue);

    useEffect(() => {
      Object.keys(initialValue).length && utils.setFormValue(initialValue);
    }, [initialValue]);

    return {
      ...utils,
      loading,
      updateMutation: setMutateKey,
      resolver,
      result: getData(),
    };
  };
}

import { useForm, UseFormReturn } from "react-hook-form";
import { useQuery } from "@root/models";
import { useEffect } from "react";

type FormFactoryProps = {
  form?: UseFormReturn<any>;
  onFormSuccess(form?: UseFormReturn<any>): void;
  queryGetter(root: RootModel, data: any): any;
};

export const formFactory = ({
  form,
  onFormSuccess,
  queryGetter,
}: FormFactoryProps) => {
  const { data, setQuery, loading } = useQuery<any>();
  const utils = form ?? useForm();

  useEffect(() => {
    const keys = Object.keys(data ?? {});
    const k = keys.length ? keys[0] : "";
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (k && data && data[k as keyof typeof data]) {
      onFormSuccess(utils);
      utils.reset({});
    }
  }, [data]);

  const onSubmit = utils.handleSubmit((data) => {
    data.content = JSON.stringify(data.content);
    return setQuery((store: RootModel) => queryGetter(store, data));
  });
  const cb = () => {
    return { loading, onSubmit, data, form: utils };
  };
  return cb;
};

import { ObjectSchema } from "yup";
import { useForm, UseFormProps } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootStoreBaseMutations } from "root-model";
import { useQuery } from "root/models/stores";

type UseMutationOptions = {
  userArg?: boolean;
  schema: ObjectSchema<any>;
  defaultValues?: Record<string, any>;
  key: RootStoreBaseMutations;
};

export function useMutation(options: UseMutationOptions) {
  const { schema, userArg = true, defaultValues = {} } = options;

  const formOption: UseFormProps = {
    resolver: yupResolver(schema),
    defaultValues,
  };

  const { setQuery } = useQuery();

  const form = useForm(formOption);

  return {
    form,
  };
}

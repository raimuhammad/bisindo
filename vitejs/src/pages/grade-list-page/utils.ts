import { RootStoreBaseMutations } from "root-model";
import { GradeModelType, useQuery } from "root/models/stores";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";

type Option = {
  model?: GradeModelType | null;
  onSuccess: () => void;
  message: string;
};

type Ref = {
  [K in "grade" | "gradeEdit"]: GradeModelType;
};

const resolver = yupResolver(
  object({
    name: string().required(),
  })
);

export function useGradeForm({ model, onSuccess, message }: Option) {
  const form = useForm({
    resolver,
  });
  const { setQuery, loading, data } = useQuery<Ref>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && (data.grade || data.gradeEdit)) {
      enqueueSnackbar(message, { variant: "success" });
      onSuccess();
      form.reset({ name: "" });
    }
  }, [data]);

  useEffect(() => {
    if (model) {
      form.setValue("name", model.name);
    } else {
      form.setValue("name", "");
    }
  }, [model]);

  const api = (data: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return setQuery((store: RootModel) => {
      if (!model) {
        return store.mutateGrade({ ...data });
      }
      if (model) {
        return store.mutateGradeEdit({ id: model.id, ...data });
      }
    });
  };
  const handler = form.handleSubmit(api);
  return { form, handler, loading };
}

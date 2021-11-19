import * as React from "react";
import { selectFieldFactory, Option, Props as BaseProps } from "./select-field";
import { observer } from "mobx-react";
import { GradeModelType, useQuery } from "@model";
import { useFormContext } from "react-hook-form";

type Props = {
  gradeId?: string;
} & Omit<BaseProps, "name" | "options">;

export const GradeField = observer(({ gradeId, ...props }: Props) => {
  const { data, setQuery } = useQuery<{ gradeAll: Array<GradeModelType> }>();
  const getOptions = () => {
    if (!data || !data.gradeAll) {
      return [];
    }
    return data.gradeAll.map(
      (item): Option => ({
        value: item.id,
        label: item.name,
      })
    );
  };

  const fetch = () => {
    setQuery((model: any) =>
      model.queryGradeAll({}, (instance: any) => instance.name.id)
    );
  };
  const form = useFormContext();
  React.useEffect(() => {
    if (data && data.gradeAll && gradeId) {
      form.setValue("grade_id", gradeId);
    }
  }, [data]);
  React.useEffect(() => {
    fetch();
  }, []);

  const Node = selectFieldFactory(getOptions());

  return (
    <Node
      disabled={Boolean(gradeId)}
      name="grade_id"
      label="Batch"
      {...props}
    />
  );
});

import * as React from "react";
import { selectFieldFactory, Option } from "./select-field";
import { observer } from "mobx-react";
import { GradeModelType, useQuery } from "root/models/stores";
import { useLocation } from "react-router-dom";
import voca from "voca";
import { useFormContext } from "react-hook-form";

type Props = {
  gradeId?: string;
};

export const GradeField = observer(({ gradeId }: Props) => {
  const { data, setQuery } = useQuery<{ grades: Array<GradeModelType> }>();
  const getOptions = () => {
    if (!data || !data.grades) {
      return [];
    }
    return data.grades.map(
      (item): Option => ({
        value: item.id,
        label: item.name,
      })
    );
  };

  const fetch = () => {
    setQuery((model: RootModel) => model.queryGrades());
  };
  const form = useFormContext();
  React.useEffect(() => {
    if (data && data.grades && gradeId) {
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
      variant="outlined"
      label="Jenjang"
    />
  );
});

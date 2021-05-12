import * as React from "react";
import { selectFieldFactory, Option } from "./select-field";
import { observer } from "mobx-react";
import { GradeModelType, useQuery } from "root/models/stores";

export const GradeField = observer(() => {
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

  React.useEffect(() => {
    fetch();
  }, []);

  const Node = selectFieldFactory(getOptions());

  return <Node name="grade_id" variant="outlined" label="Jenjang" />;
});

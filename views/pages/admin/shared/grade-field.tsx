import * as React from "react";
import { AutoCompleteField, Props } from "@components/form-field/auto-complete";
import { RootStoreBaseQueries } from "@root-model";
import { GradeModelSelector, GradeModelType } from "@root/models";

const config = {
  query: RootStoreBaseQueries.queryGradeAll,
  builder(i: GradeModelSelector) {
    return i.name.id;
  },
  toOptions(grade: GradeModelType) {
    return {
      label: grade.name as string,
      value: grade.id as string,
    };
  },
};

export const GradeField = (
  props: Omit<Props, "name" | "options" | "queryOptions">
) => {
  return <AutoCompleteField name="gradeId" {...props} queryOptions={config} />;
};

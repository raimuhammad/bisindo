import * as React from "react";
import { transformModelForm } from "@components/quiz/multiple-choise/utils";
import { Viewer as MultipleChoiceView } from "@components/quiz/multiple-choise/viewer";

export const MultipleChoiceForm = () => {
  const model = transformModelForm();
  return <MultipleChoiceView model={model} />;
};

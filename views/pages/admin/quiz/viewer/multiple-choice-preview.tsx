import * as React from "react";
import { Viewer as MultipleChoiceView } from "@components/quiz/multiple-choise/viewer";
import { QuizModelType } from "@root/models";

export const MultipleChoicePreview = ({ model }: { model: QuizModelType }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <MultipleChoiceView model={model} />;
};

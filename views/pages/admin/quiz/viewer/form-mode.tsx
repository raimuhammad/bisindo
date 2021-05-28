import * as React from "react";
import { QuizType } from "@root/models";
import { ImageMatchForm } from "./image-match-form";
import { MultipleChoiceForm } from "./multiple-choice-form";
import { useStore } from "../provider";

const DefaultComponent = () => <h1>Wait for implementation</h1>;

const formMap: Record<QuizType, React.ComponentType> = {
  MULTIPLE_CHOICE: MultipleChoiceForm,
  IMAGE_MATCH: ImageMatchForm,
  LETTER_SEQUENCE: DefaultComponent,
};
export const FormMode = () => {
  const { formType } = useStore();
  const Com = formMap[formType];
  return <Com />;
};

import * as React from "react";
import { QuizType } from "@root/models";
import { MultipleChoicePreview } from "./multiple-choice-preview";
import { ImageMatchPreview } from "./image-match-preview";
import { useStore } from "../provider";

const DefaultComponent = () => <h1>Wait for implementation</h1>;

const viewMap: Record<QuizType, React.ComponentType<any>> = {
  MULTIPLE_CHOICE: MultipleChoicePreview,
  IMAGE_MATCH: ImageMatchPreview,
  LETTER_SEQUENCE: DefaultComponent,
};

export const ViewMode = () => {
  const { selected } = useStore();
  if (!selected) {
    return <></>;
  }
  const { type } = selected;
  const Com = viewMap[type as QuizType];
  return <Com model={selected} />;
};

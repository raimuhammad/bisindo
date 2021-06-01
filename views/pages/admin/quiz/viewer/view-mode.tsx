import * as React from "react";
import { QuizType } from "@root/models";
import { MultipleChoicePreview } from "./multiple-choice-preview";
import { ImageMatchPreview } from "./image-match-preview";
import { useStore } from "../provider";
import { LetterSequencePreview } from "./letter-sequence-preview";


const viewMap: Record<QuizType, React.ComponentType<any>> = {
  MULTIPLE_CHOICE: MultipleChoicePreview,
  IMAGE_MATCH: ImageMatchPreview,
  LETTER_SEQUENCE: LetterSequencePreview,
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

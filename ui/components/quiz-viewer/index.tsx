import { ImageMatch } from "./image-match";
import { MultipleChoise } from "./multiple-choise";
import { LetterSequence } from "./letter-sequence";
import type { QuizType } from "@root/models";
import { ComponentType, Fragment } from "react";

type Props = {
  type: QuizType;
  viewerProps: any
};

const ComponentMap: Record<QuizType, ComponentType<any>> = {
  LETTER_SEQUENCE: LetterSequence,
  MULTIPLE_CHOICE: MultipleChoise,
  IMAGE_MATCH: ImageMatch,
};

export const QuizViewer = ({ type, viewerProps }: Props) => {
  const Component = ComponentMap[type] ?? Fragment;
  return <Component {...viewerProps} />;
};

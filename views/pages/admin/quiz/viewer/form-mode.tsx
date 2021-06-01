import * as React from "react";
import { QuizType } from "@root/models";
import { ImageMatchForm } from "./image-match-form";
import { MultipleChoiceForm } from "./multiple-choice-form";
import { useStore } from "../provider";
import { LetterSequenceForm } from "./letter-sequence-form";


const formMap: Record<QuizType, React.ComponentType> = {
  MULTIPLE_CHOICE: MultipleChoiceForm,
  IMAGE_MATCH: ImageMatchForm,
  LETTER_SEQUENCE: LetterSequenceForm,
};
export const FormMode = () => {
  const { formType } = useStore();
  const Com = formMap[formType];
  return <Com />;
};

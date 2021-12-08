import { createContext, useContext, useEffect, useState } from "react";
import { useToggle } from "@hooks/use-toggle";
import { useQuizDimension } from "../quiz-viewer-container";

export type Option = {
  content: string;
  type: "image" | "text";
};
export type Props = {
  answer: number;
  question: string;
  image: string;
  options: Option[];
};
export function useMultipleChoiseProvider(props: Props) {
  const [selected, setSelected] = useState<number>(-1);
  const [isSubmitted, { inline }] = useToggle();
  const { show } = useQuizDimension();
  useEffect(() => {
    setSelected(-1);
    inline(false);
  }, [show]);
  const onSubmitted = () => {
    if (selected !== -1) {
      inline(true);
    }
  };
  const changeAnswer = (n: number) => {
    if (!isSubmitted) {
      setSelected(n);
    }
  };
  return {
    isSubmitted,
    isTouched: selected !== -1,
    changeAnswer,
    onSubmitted,
    selected,
    isAnswerCorrect: isSubmitted && selected === (props.answer - 1),
  };
}
export type UseMultipleChoice = ReturnType<typeof useMultipleChoiseProvider>;
export const MultipleChoiceContext = createContext<null | UseMultipleChoice>(
  null
);
export function useMultipleChoice() {
  return useContext(MultipleChoiceContext) as UseMultipleChoice;
}

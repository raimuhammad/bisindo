import { Hoc } from "./hoc";
import { useQuizDimension } from "@components/quiz-viewer/quiz-viewer-container";

export const LetterSequence = ({ text, onSubmit }: any) => {
  const { height, width } = useQuizDimension();
  return <Hoc width={width} height={height} onSubmit={onSubmit} text={text} />;
};

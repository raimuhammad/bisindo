import { useQuizDimension } from "@components/quiz-viewer/quiz-viewer-container";
import { Hoc } from "./hoc";

export const ImageMatch = ({ text, onSubmit }: any) => {
  const { height, width } = useQuizDimension();
  return (
    <>
      <Hoc text={text} onSubmit={onSubmit} stageHeight={height as number} />
    </>
  );
};

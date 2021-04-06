import * as React from "react";
import Konva from "konva";
import { ImageQuiz, WithQuestion } from "components/quiz/image-quiz/types";
import Data from "../../../image-quiz.json";
import { makeQuestions, useArrowListener, useOnLetterClick } from "./utilities";
import { sampleSize } from "lodash";

type XYPOS = Record<"x" | "y", number>;

type QuizStage = {
  stage: Konva.Stage | null;
  setStage(stage: Konva.Stage): void;
  getXyPos(item: ImageQuiz, isImage?: boolean): XYPOS;
  items: Array<WithQuestion>;
  onLetterGroupClick(e: any): void;
};

export const Context = React.createContext<null | QuizStage>(null);

export const InStageContext = React.createContext<null | QuizStage>(null);

export function useStage(instage = false): QuizStage {
  return React.useContext(instage ? InStageContext : Context) as QuizStage;
}

export function useProvider(): QuizStage {
  const [stage, setStage] = React.useState<null | Konva.Stage>(null);
  const questions = makeQuestions(Data);
  const [items, setItems] = React.useState<Array<WithQuestion>>([]);
  React.useEffect(() => {
    setItems(sampleSize(questions, 4));
  }, []);
  const [painting, setPainting] = React.useState<boolean>(false);
  const [lineNode, setLineNode] = React.useState<Konva.Arrow | null>(null);
  const onLetterGroupClick = useOnLetterClick({
    stage,
    lineSetter: setLineNode,
    onPainting: setPainting,
  });
  const onReset = React.useCallback(() => {
    setPainting(false);
    if (stage && lineNode) {
      lineNode.remove();
      stage.draw();
    }
    setLineNode(null);
  }, [lineNode, stage]);
  const onAttached = React.useCallback(() => {
    setPainting(false);
    setLineNode(null);
  }, []);
  useArrowListener({
    stage,
    line: lineNode,
    onReset,
    onAttached,
    isPainting: painting,
  });
  const getXyPos = (item: ImageQuiz, isImage = false): XYPOS => {
    if (stage) {
      const x = isImage ? stage.getSize().width - 110 : 10;
      const index = items.findIndex((find) => find.id === item.id);
      const y = !index ? 10 : index * (100 + 20);
      return { x, y };
    }
    return { x: 0, y: 0 };
  };
  return {
    items,
    getXyPos,
    setStage,
    stage,
    onLetterGroupClick,
  };
}

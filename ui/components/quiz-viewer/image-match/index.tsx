import { useQuizDimension } from "@components/quiz-viewer/quiz-viewer-container";
import { AppBar } from "@mui/material";
import { useRef, useState } from "react";
import { useMount } from "react-use";
import { Hoc } from "./hoc";

export const ImageMatch = ({text}: any) => {
  const { height, width } = useQuizDimension();
  return (
    <>
      <Hoc text={text} stageHeight={height as number} />
    </>
  );
};

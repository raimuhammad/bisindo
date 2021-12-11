import { useQuizDimension } from "@components/quiz-viewer/quiz-viewer-container";
import { AppBar } from "@mui/material";
import { useRef, useState } from "react";
import { useMount } from "react-use";
import { Hoc } from "./hoc";

export const ImageMatch = ({ text, onSubmit }: any) => {
  const { height, width } = useQuizDimension();
  return (
    <>
      <Hoc text={text} onSubmit={onSubmit} stageHeight={height as number} />
    </>
  );
};

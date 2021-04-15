import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { KonvaProvider } from "providers/konva/konva-provider";
import { LetterContainer } from "./letter-container";
import { QuestionContainer } from "./question-container";
import { LetterPuzzleProvider, useLetterItem } from "./letter-puzzle-provider";

const useClasses = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column",
  },
}));

const Wrap = () => {
  const { items } = useLetterItem();
  return (
    <>
      {items.map((item) => (
        <LetterContainer {...item} key={item.id} />
      ))}
    </>
  );
};

export const LetterPuzzle = () => {
  const classes = useClasses();
  return (
    <div className={classes.root}>
      <KonvaProvider>
        <LetterPuzzleProvider text="saya">
          <Wrap />
          <QuestionContainer />
        </LetterPuzzleProvider>
      </KonvaProvider>
    </div>
  );
};

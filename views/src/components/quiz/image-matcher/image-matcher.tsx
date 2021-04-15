import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { Box } from "./box";
import { LetterContainer } from "./letter-container";
import { ImageContainer } from "./image-container";
import { ImageMatcherProvider } from "./image-matcher-provider";
import { KonvaProvider } from "providers/konva/konva-provider";
import { Controller } from "./controller";
import { useSimulations } from "./utility";
import { ItemAnswer } from "components/quiz/image-matcher/types";

const useClasses = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column",
  },
}));

export const ImageMatcher = () => {
  const classes = useClasses();
  const simulations = useSimulations();
  const handler = (data: ItemAnswer[]) => {
    const rightAnswers = data.filter(
      (item) => item.itemAnswer === item.itemQuestion
    );
    const grades = (rightAnswers.length / data.length) * 100;
    console.log(data, grades);
  };
  return (
    <div className={classes.root}>
      <KonvaProvider>
        <ImageMatcherProvider onSubmitted={handler} {...simulations}>
          <Box component={LetterContainer} />
          <Box component={ImageContainer} />
          <Controller />
        </ImageMatcherProvider>
      </KonvaProvider>
    </div>
  );
};

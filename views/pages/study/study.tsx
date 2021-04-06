import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { Controller } from "./controller";
import { VideoContainer } from "./video-container";
import { Discussion } from "./discussion";
import { Quiz } from "./quiz";
import { Provider, useStudyPage } from "./provider";
import { AnimatePresence } from "framer-motion";
import { Player } from "./player";
import { QuizContainer } from "./quiz-container";

const useClasses = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: "flex",
    overflow: "hidden",
  },

  contentContainer: {
    width: "40%",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: "white",
  },
}));

const WrapAnimate = () => {
  const { active } = useStudyPage();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      {active === "/video" ? <VideoContainer /> : null}
      {active === "/discussion" ? <Discussion /> : null}
      {active === "/quiz" ? <Quiz /> : null}
    </AnimatePresence>
  );
};

export const Study = () => {
  const classes = useClasses();
  return (
    <Provider>
      <QuizContainer />
      <div className={classes.root}>
        <Player />
        <div className={classes.contentContainer}>
          <Controller />
          <WrapAnimate />
        </div>
      </div>
    </Provider>
  );
};

import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { Provider } from "./study-page-provider";
import { VideoContainer } from "./video-container";
import { VideoList } from "./video-list";
import { QuizContainer } from "./quiz-container";

const useClasses = makeStyles((theme) => ({
  root: {
    height: "100%",
    flexGrow: 1,
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
  },
  videoContainer: {
    width: "70%",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
  videoListContainer: {
    width: "30%",
    paddingTop: theme.spacing(3),
  },
}));

export const Study = () => {
  const classes = useClasses();
  return (
    <Provider>
      <div className={classes.root}>
        <div className={classes.videoContainer}>
          <VideoContainer />
        </div>
        <div className={classes.videoListContainer}>
          <VideoList />
        </div>
      </div>
      <QuizContainer />
    </Provider>
  );
};

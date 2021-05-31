import { Box, makeStyles, Theme, Typography } from "@material-ui/core";
import { QuizHelper, useVideoPage } from "@providers/study-provider/provider";
import { ListContent } from "@student-pages/study/list-content";
import * as React from "react";
import { Book, Check, Close } from "@material-ui/icons";

const useClasses = makeStyles((theme: Theme) => ({
  right: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  nonRight: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
  },
}));

export const QuizList = () => {
  const { quizes, setPreparedQuiz } = useVideoPage();
  const classes = useClasses();
  const getClass = (helper: QuizHelper, base: string) => {
    if (!helper.show) {
      return base;
    }
    return helper.isRightAnswer ? classes.right : classes.nonRight;
  };
  const getIcon = (helper: QuizHelper) => {
    if (!helper.show) return <Book />;
    return helper.isRightAnswer ? <Check /> : <Close />;
  };
  return (
    <ListContent
      data={quizes}
      itemClassname={getClass}
      onItemClick={setPreparedQuiz}
      getLabel={(quiz: QuizHelper, index) => {
        return (
          <Box component="span" display="flex" justifyContent="space-between">
            <Typography
              style={{ display: "flex", alignItems: "center" }}
              component="span"
            >
              {getIcon(quiz)} <span> Quis {index + 1} </span>
            </Typography>
            <Typography component="span">{quiz.durationText}</Typography>
          </Box>
        );
      }}
      title=""
    />
  );
};

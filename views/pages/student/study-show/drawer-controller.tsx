import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Grid,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import { QuizHelper, useVideoPage } from "@providers/study-provider/provider";
import { QuizType } from "@root/models";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { MultipleChoiceViewer } from "@components/quiz/multiple-choise";
import { ImageMatcherViewer } from "@components/quiz/image-matcher";
import { ArrowState, ListenerArgs } from "@components/quiz/image-matcher/types";
import { ViewerType } from "@components/quiz/multiple-choise/type";
import { useToggle } from "@hooks/use-toggle";
import { useState } from "react";
import { isEqual } from "lodash";

type ChildProps = {
  helper: QuizHelper;
  appbarHeight: number;
};

const MultipleChoiceController = ({ helper }: ChildProps) => {
  const { onSubmitted } = useVideoPage();

  const onSubmit = (answer: number) => {
    onSubmitted(helper, answer === helper.questionAnswer);
  };

  return (
    <Box
      style={{
        overflow: "auto",
      }}
    >
      <Grid container justify="center">
        <Grid item sm={12} md={8}>
          <Box display="flex" alignItems="center">
            <MultipleChoiceViewer
              viewOnly={false}
              onSubmit={onSubmit}
              model={helper as ViewerType}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const ImageMatcher = ({ appbarHeight, helper }: ChildProps) => {
  const { nodeRef } = useNodeDimension();
  const [showHint, { force }] = useToggle();
  const [hintDisabled, { inline }] = useToggle();
  const [answers, setAnswers] = useState<Array<ArrowState>>([]);
  const contentHeight = nodeRef.current
    ? window.innerHeight -
      (nodeRef.current?.getBoundingClientRect().height + appbarHeight)
    : 0;
  const theme = useTheme();
  const listener = ({ arrow, items }: ListenerArgs) => {
    const arr = [...answers, arrow];
    setAnswers(arr);
    inline(arr.length === items.length);
  };
  const { onSubmitted } = useVideoPage();

  const onSubmit = () => {
    const filteredAnswer = answers.filter(
      (item) => item.targetLetter === item.fromLetter
    );
    onSubmitted(helper, filteredAnswer.length === answers.length);
  };
  return (
    <Box
      overflow="auto"
      style={{ overflowX: "hidden" }}
      height={`calc(100vh - ${appbarHeight}px)`}
    >
      <div ref={nodeRef as any}>
        <Paper>
          <Box padding={2} paddingBottom={0} display="flex">
            <Box flex={1}>
              <Tabs value={showHint ? 1 : 0}>
                <Tab label="Jawaban anda" onClick={force(false)} />
                <Tab
                  disabled={!hintDisabled}
                  label="Hasil"
                  onClick={force(true)}
                />
              </Tabs>
            </Box>
            <Box>
              <Button onClick={onSubmit} disabled={!showHint}>
                Tutup
              </Button>
            </Box>
          </Box>
        </Paper>
      </div>
      {contentHeight ? (
        <Box paddingY={2} height={contentHeight}>
          <ImageMatcherViewer
            answers={showHint ? [] : answers}
            listener={listener}
            showHint={showHint}
            text={helper.image_matcher as string}
            height={contentHeight - theme.spacing(4)}
            width={window.innerWidth - theme.spacing(4)}
          />
        </Box>
      ) : null}
    </Box>
  );
};

const childMap: Record<QuizType, React.ComponentType<ChildProps>> = {
  [QuizType.IMAGE_MATCH]: ImageMatcher,
  [QuizType.MULTIPLE_CHOICE]: MultipleChoiceController,
  [QuizType.LETTER_SEQUENCE]: () => <h1>Letter sequnce</h1>,
};

export const DrawerController = () => {
  const { preparedQuiz, showQuiz } = useVideoPage();

  const open = Boolean(preparedQuiz && showQuiz);
  const Child = !preparedQuiz ? null : childMap[preparedQuiz.type as QuizType];
  const { nodeRef, dimension } = useNodeDimension();
  const height = nodeRef.current
    ? nodeRef.current?.getBoundingClientRect().height
    : 0;
  return (
    <Dialog
      keepMounted
      PaperProps={{
        style: {
          backgroundColor: "#e5e5e5",
          minHeight: "100vh",
        },
      }}
      open={Boolean(open)}
      fullScreen
    >
      <AppBar ref={nodeRef} position="sticky">
        <Toolbar>
          <Typography variant="h4">QUIS</Typography>
        </Toolbar>
      </AppBar>
      {Child && height ? (
        <Child appbarHeight={height} helper={preparedQuiz as QuizHelper} />
      ) : null}
    </Dialog>
  );
};

/* eslint-disable */
import * as React from "react";
import { AppBar, Button, Dialog, Slide, Toolbar } from "@material-ui/core";
import { useStudyPage } from "./study-page-provider";
import { ImageMatcher } from "components/quiz/image-matcher/image-matcher";
import { LetterPuzzle } from "components/quiz/letter-puzzle/letter-puzzle";
import { QuestionQuiz } from "components/quiz/question-quiz/question-quiz";
import { Theme } from "../../layout/layout";

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});
export const QuizContainer = Theme(() => {
  const { quiz, handleQuiz } = useStudyPage();
  const handleClose = () => {
    handleQuiz(null);
  };
  return (
    <>
      <div>
        <Dialog
          fullScreen
          keepMounted
          open={Boolean(quiz)}
          onClose={handleClose}
          // @ts-ignore
          TransitionComponent={Transition}
        >
          <AppBar>
            <Toolbar>
              <Button color="inherit" onClick={handleClose}>
                Tutup
              </Button>
            </Toolbar>
          </AppBar>
          <div
            style={{
              marginTop: "5rem",
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {quiz === "soal1" ? <QuestionQuiz /> : null}
            {quiz === "soal2" ? <ImageMatcher /> : null}
            {quiz === "soal3" ? <LetterPuzzle /> : null}
          </div>
        </Dialog>
      </div>
    </>
  );
});

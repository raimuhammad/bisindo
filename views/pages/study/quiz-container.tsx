import * as React from "react";
import {
  AppBar,
  Button,
  Dialog,
  Slide,
  Toolbar,
  createMuiTheme,
} from "@material-ui/core";
import { useStudyPage } from "./provider";
import { ImageQuizContainer } from "../../components/quiz/image-quiz";
import { ChoiseQuiz } from "../../components/quiz/choise-quiz";
import { ThemeProvider } from "@material-ui/styles";

const Theme = createMuiTheme();

const Transition = React.forwardRef(function Transition(props, ref) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});
export const QuizContainer = () => {
  const { quiz, handleQuiz } = useStudyPage();
  const handleClose = () => {
    handleQuiz(null);
  };
  return (
    <ThemeProvider theme={Theme}>
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
              justifyContent: "center",
            }}
          >
            {quiz === "soal1" ? <ChoiseQuiz /> : null}
            {quiz === "soal2" ? <ImageQuizContainer /> : null}
            {quiz === "soal3" ? <h1>Coming soon</h1> : null}
          </div>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

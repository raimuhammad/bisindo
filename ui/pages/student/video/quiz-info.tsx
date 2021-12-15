import { QuizBar } from "./quiz-bar";
import { QuizListInfo } from "@components/quiz-list-info";
import { useStudent } from "@providers/student-contexts";
import { useVideo } from "./provider";
import ReactHotkeys from "react-hot-keys";
import { useToggle } from "@hooks/use-toggle";
import { Collapse } from "@mui/material";

export const QuizInfo = () => {
  const {
    progressInfo: { quizHistory },
  } = useStudent();
  const { video } = useVideo();
  const [showbar, { toggle }] = useToggle();

  return (
    <ReactHotkeys onKeyUp={toggle} keyName="ctrl+q">
      <Collapse in={showbar}>
        <QuizBar />
      </Collapse>
      <QuizListInfo history={quizHistory} quizes={video.quizes as any} />
    </ReactHotkeys>
  );
};

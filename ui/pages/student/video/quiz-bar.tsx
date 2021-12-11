import { Box, Button, Divider } from "@mui/material";
import { useVideo } from "./provider";
import { useStudent } from "@providers/student-contexts";
import { QuizModelType } from "@root/models";
import { observer } from "mobx-react";

export const QuizBar = observer(() => {
  const {
    video,
    quiz: { handleOpen },
  } = useVideo();
  const {
    progressInfo: { quizHistory },
  } = useStudent();
  const quizes = video.quizes;

  const isDisabled = (v: QuizModelType) => {
    return Boolean(quizHistory.find((item) => {
      return item.id.toString() === v.id.toString();
    }));
  };

  return (
    <Box sx={{ pb: 2 }}>
      <Divider />
      {quizes.map((item, index) => (
        <Button
          disabled={isDisabled(item)}
          onClick={handleOpen(item)}
          sx={{ textTransform: "none" }}
          key={item.id}
        >
          Quis {index + 1}
        </Button>
      ))}
      <Divider />
    </Box>
  );
});

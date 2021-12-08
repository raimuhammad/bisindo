import { Box, Button, Typography } from "@mui/material";
import { useMultipleChoice } from "./provider";
import { useQuizDimension } from "../quiz-viewer-container";

export const QuizInfo = () => {
  const { selected, onSubmitted, isSubmitted, isAnswerCorrect } =
    useMultipleChoice();
  const { handleClose } = useQuizDimension();
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "90%" }}>
      <Typography
        sx={{
          color: isAnswerCorrect
            ? "success.main"
            : isSubmitted
            ? "error,main"
            : "inherit",
        }}
      >
        {isSubmitted
          ? isAnswerCorrect
            ? "Jawaban anda benar"
            : "Maaf jawaban anda kurang tepat"
          : "Klik kunci jawaban untuk melihat hasil jawaban anda"}
      </Typography>
      <Button
        onClick={isSubmitted ? () => handleClose(false) : onSubmitted}
        disabled={selected === -1}
        sx={{ textTransform: "none", ml: "auto" }}
      >
        {isSubmitted ? "Tutup" : "Kunci jawaban"}
      </Button>
    </Box>
  );
};

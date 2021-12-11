import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useMultipleChoice } from "./provider";
import { useQuizDimension } from "../quiz-viewer-container";
import { useOnSubmit } from "../use-onSubmit";
import { AnimatePresence, motion } from "framer-motion";

export const QuizInfo = () => {
  const { selected, onSubmitted, isAnswerCorrect, onSubmit } =
    useMultipleChoice();
  const { handleClose } = useQuizDimension();
  const {
    loading,
    onSubmitHandler,
    submitted: isSubmitted,
  } = useOnSubmit({
    isCorrect: isAnswerCorrect,
    onSubmit,
    onSuccess: onSubmitted,
  });

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
      <AnimatePresence exitBeforeEnter>
        <motion.div
          style={{ marginLeft: "auto" }}
          key={loading ? "loading" : "not-loading"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {loading ? (
            <CircularProgress sx={{ml: "auto"}} size={20} />
          ) : (
            <Button
              onClick={isSubmitted ? () => handleClose(false) : onSubmitHandler}
              disabled={selected === -1}
              sx={{ textTransform: "none", ml: "auto" }}
            >
              {isSubmitted ? "Tutup" : "Kunci jawaban"}
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

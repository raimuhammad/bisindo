import {
  Box,
  Typography,
  AppBar,
  Button,
  CircularProgress,
} from "@mui/material";
import { useQuizDimension } from "@components/quiz-viewer/quiz-viewer-container";
import { useLetterContext } from "@components/quiz-viewer/letter-sequence/provider";
import { sortBy } from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import { useOnSubmit } from "../use-onSubmit";

export const Controller = () => {
  const { height } = useQuizDimension();
  const {
    text,
    toggleHint,
    toggleMode,
    toggleDrag,
    nodes,
    mode,
    showHint,
    onSubmit,
  } = useLetterContext();
  const top = window.innerHeight - (height as number);
  const answer = sortBy(nodes, "x").map((item) => item.text);
  const isRight = text === answer.join("");
  const {
    loading,
    onSubmitHandler: onSubmitted,
    submitted,
  } = useOnSubmit({
    isCorrect: isRight,
    onSubmit,
    onSuccess() {
      toggleDrag();
    },
  });
  return (
    <AppBar
      elevation={0}
      variant="outlined"
      color="transparent"
      sx={{
        position: "fixed",
        top: top,
        width: "100%",
        height: "fit-content",
        p: 1,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography variant="h6">
          Susunlah kata {`"${text}"`} dengan menggunakan bisindo
        </Typography>
        <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={submitted ? "submitted" : "not-submitted"}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} />
                </>
              ) : submitted ? (
                <>
                  <Button
                    onClick={toggleMode}
                    sx={{ textTransform: "none", mr: 2 }}
                    variant="outlined"
                  >
                    Tampilkan {mode === "letter" ? "gambar" : "huruf"}
                  </Button>
                  <Button
                    onClick={toggleHint}
                    sx={{ textTransform: "none" }}
                    variant="outlined"
                  >
                    Kunci jawaban
                  </Button>
                </>
              ) : (
                <Button
                  onClick={onSubmitted}
                  sx={{ textTransform: "none" }}
                  variant="outlined"
                >
                  {showHint ? "Jawaban anda" : "Kunci jawaban"}
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </AppBar>
  );
};

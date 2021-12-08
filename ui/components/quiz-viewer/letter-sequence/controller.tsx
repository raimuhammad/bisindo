import { Box, Typography, AppBar, Button } from "@mui/material";
import { useQuizDimension } from "@components/quiz-viewer/quiz-viewer-container";
import { useLetterContext } from "@components/quiz-viewer/letter-sequence/provider";
import { sortBy } from "lodash";

export const Controller = () => {
  const { height } = useQuizDimension();
  const { text, toggleHint, toggleMode, nodes } = useLetterContext();

  const top = window.innerHeight - (height as number);

  const onSubmitted = () => {
    const answer = sortBy(nodes, "x").map((item) => item.text);
    console.log("Answer:", answer.join(""));
  };

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
          Susunlah kata "{text}" dengan menggunakan bisindo
        </Typography>
        <Box sx={{ ml: "auto" }}>
          <Button
            onClick={toggleMode}
            sx={{ textTransform: "none" }}
            variant="outlined"
          >
            Mode
          </Button>
          <Button
            onClick={toggleHint}
            sx={{ textTransform: "none" }}
            variant="outlined"
          >
            Kunci jawaban
          </Button>
          <Button
            onClick={onSubmitted}
            sx={{ textTransform: "none" }}
            variant="outlined"
          >
            Periksa jawaban
          </Button>
        </Box>
      </Box>
    </AppBar>
  );
};

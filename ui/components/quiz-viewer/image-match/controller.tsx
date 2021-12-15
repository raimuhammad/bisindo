import { Button, Toolbar, Typography, Box, ButtonGroup } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useImageMatch } from "./provider";
import { useOnSubmit } from "../use-onSubmit";
import { useToggle } from "@hooks/use-toggle";

export const Controller = () => {
  const {
    popArrow,
    arrows,
    toggleHint,
    isSubmitDisabled,
    isAnswerCorrect,
    onSubmit,
    showHint,
  } = useImageMatch();
  const [enableHintButton, { force }] = useToggle();
  const { onSubmitHandler, submitted, loading } = useOnSubmit({
    isCorrect: isAnswerCorrect,
    onSuccess: force(true),
    onSubmit,
  });

  return (
    <Toolbar>
      <Typography sx={{ mr: "auto" }}>
        Samakan huruf & gambar berikut sesuai hurufnya
      </Typography>
      <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
        {submitted ? (
          <Typography sx={{ display: "inline-block", mr: 2 }}>
            {isAnswerCorrect
              ? "Jawaban anda benar"
              : "Maaf jawaban anda tidak tepat"}
          </Typography>
        ) : null}
        <ButtonGroup sx={{ display: "block" }}>
          <Button
            onClick={popArrow}
            disabled={loading || submitted || arrows.length === 0}
            size="small"
            variant="outlined"
            sx={{
              textTransform: "none",
            }}
            startIcon={<ArrowBack />}
          >
            Batalkan pilihan
          </Button>
          <Button
            onClick={onSubmitHandler}
            disabled={isSubmitDisabled || submitted}
            size="small"
            variant="outlined"
            sx={{
              textTransform: "none",
            }}
          >
            Simpan jawaban
          </Button>
        </ButtonGroup>
      </Box>
      <Button
        onClick={toggleHint}
        disabled={!enableHintButton || isAnswerCorrect}
        size="small"
        variant="outlined"
        sx={{
          textTransform: "none",
        }}
      >
        {showHint ? "Jawaban saya" : "Tampilkan kunci jawaban"}
      </Button>
    </Toolbar>
  );
};

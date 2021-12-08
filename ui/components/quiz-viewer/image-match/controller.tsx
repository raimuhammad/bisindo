import { Button, Toolbar, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useImageMatch } from "./provider";

export const Controller = () => {
  const { popArrow, arrows, toggleHint } = useImageMatch();
  return (
    <Toolbar>
      <Typography sx={{mr:"auto"}}>
        Samakan huruf & gambar berikut sesuai hurufnya
      </Typography>
      <Button
        onClick={popArrow}
        disabled={arrows.length === 0}
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
        onClick={toggleHint}
        size="small"
        variant="outlined"
        sx={{
          textTransform: "none",
        }}
      >
        Show hint
      </Button>
    </Toolbar>
  );
};

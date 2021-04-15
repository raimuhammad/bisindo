import * as React from "react";
import { Button, ButtonGroup, makeStyles, Typography } from "@material-ui/core";
import { useImageMatcher } from "./image-matcher-provider";
import { useKonva } from "providers/konva/konva-provider";

type ActionsProps = Record<"onBackAction" | "onSubmit", () => void>;

const useClasses = makeStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: theme.spacing(3),
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
  },
  question: {
    position: "absolute",
    top: theme.spacing(3),
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
  },
}));

const Question = () => {
  const classes = useClasses();
  return (
    <div className={classes.question}>
      <Typography>
        Hubungkan huruf-huruf di bawah dengan gambar yang sesuai
      </Typography>
    </div>
  );
};
const Action = ({ onBackAction, onSubmit }: ActionsProps) => {
  const classes = useClasses();
  return (
    <div className={classes.root}>
      <ButtonGroup variant="contained">
        <Button color="secondary" onClick={onBackAction}>
          Batal
        </Button>
        <Button color="primary" onClick={onSubmit}>
          Masukan jawaban
        </Button>
      </ButtonGroup>
    </div>
  );
};

export const Controller = () => {
  const { onBackAction, onSubmitted } = useImageMatcher();
  const { attachPortal } = useKonva();
  const classes = useClasses();
  React.useEffect(() => {
    attachPortal(
      <>
        <Action onSubmit={onSubmitted} onBackAction={onBackAction} />
        <Question />
      </>,
      " "
    );
  }, [classes, onBackAction, onSubmitted]);

  return null;
};

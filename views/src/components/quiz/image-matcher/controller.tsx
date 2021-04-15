import * as React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { useImageMatcher } from "./image-matcher-provider";
import { useKonva } from "providers/konva/konva-provider";

type ActionsProps = Record<"onBackAction" | "onSubmit", () => void>;

const ButtonGroup = ({ onBackAction, onSubmit }: ActionsProps) => {
  return (
    <div>
      <Button onClick={onBackAction}>Batal</Button>
      <Button onClick={onSubmit}>Masukan jawaban</Button>
    </div>
  );
};

const useClasses = makeStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: theme.spacing(3),
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
  },
}));

export const Controller = () => {
  const { onBackAction, onSubmitted } = useImageMatcher();
  const { attachPortal } = useKonva();
  const classes = useClasses();
  React.useEffect(() => {
    attachPortal(
      <ButtonGroup onSubmit={onSubmitted} onBackAction={onBackAction} />,
      classes.root
    );
  }, [classes, onBackAction, onSubmitted]);

  return null;
};

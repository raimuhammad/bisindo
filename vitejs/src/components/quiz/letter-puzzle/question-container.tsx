/* eslint-disable */
import * as React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { useKonva } from "providers/konva/konva-provider";
import { useLetterItem } from "components/quiz/letter-puzzle/letter-puzzle-provider";
import { sortBy } from "lodash";

const useClasses = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: theme.spacing(3),
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    width: "80%",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
    zIndex: 2,
  },
  submit: {
    transform: "translateX(-50%)",
    position: "absolute",
    bottom: theme.spacing(3),
    left: "50%",
    zIndex: 2,
  },
}));

type P = {
  items: ReturnType<typeof useLetterItem>["items"];
  question: string;
};

const AnswerInformer = ({ items, question }: P) => {
  const text = sortBy(items, ["itemIndex"])
    .map((item) => item.letter)
    .join("");
  const classes = useClasses();
  return (
    <div className={classes.root}>
      <p>Susunlah kata di bawah ini dengan menggunakan bahasa isyarat</p>
      <h1>{question}</h1>
      <p>Jawaban anda : {text}</p>
    </div>
  );
};

const SubmitContainer = () => {
  const classname = useClasses();
  return (
    <div className={classname.submit}>
      <Button variant="contained" color="primary">
        Konfirmasi
      </Button>
    </div>
  );
};

export const QuestionContainer = () => {
  const { attachPortal } = useKonva();
  const { items, question } = useLetterItem();
  const classes = useClasses();
  React.useEffect(() => {
    attachPortal(
      <>
        <AnswerInformer items={items} question={question} />
        <SubmitContainer />
      </>,
      " "
    );
  }, [items]);

  return null;
};

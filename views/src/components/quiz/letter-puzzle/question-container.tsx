/* eslint-disable */
import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { useKonva } from "providers/konva/konva-provider";
import { useLetterItem } from "components/quiz/letter-puzzle/letter-puzzle-provider";
import { sortBy } from "lodash";

const useClasses = makeStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: theme.spacing(3),
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    width: "80%",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
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
  return (
    <>
      <p>Susunlah kata di bawah ini dengan menggunakan bahasa isyarat</p>
      <h1>{question}</h1>
      <p>Jawaban anda : {text}</p>
    </>
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
      </>,
      classes.root
    );
  }, [items]);

  return null;
};

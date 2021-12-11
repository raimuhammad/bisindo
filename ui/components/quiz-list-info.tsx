// @flow
import * as React from "react";
import { QuizHistory, QuizModelType } from "@root/models";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Check, Close } from "@mui/icons-material";

type Props = {
  history: QuizHistory[];
  quizes: QuizModelType[];
};

const Info = ({
  index,
  history,
  quiz,
}: {
  quiz: QuizModelType;
  history?: QuizHistory;
  index: number;
}) => {
  const Icon = () => {
    if (!history) {
      return <></>;
    }
    return history.correct ? <Check /> : <Close />;
  };

  return (
    <ListItem>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText
        secondary={
          !history
            ? "Belum di kerjakan"
            : history.correct
            ? "Jawaban benar"
            : "Jawaban tidak tepat"
        }
        primary={`Quis ${index + 1}`}
      />
    </ListItem>
  );
};

export const QuizListInfo = ({ history, quizes }: Props) => {
  return (
    <List>
      {quizes.map((item, index) => (
        <Info
          quiz={item}
          history={history.find((h) => h.id.toString() === item.id.toString())}
          index={index}
          key={item.id}
        />
      ))}
    </List>
  );
};

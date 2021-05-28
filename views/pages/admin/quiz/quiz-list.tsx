import * as React from "react";
import { useQuizPaginator } from "@service-provider/quiz/paginator-provider";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
  Tooltip,
} from "@material-ui/core";
import { QuizModelType } from "@root/models";
import { getDurationTimeText } from "@utils/get-duration-time";
import { Delete, Book } from "@material-ui/icons";
import { useStore } from "./provider";

const useClasses = makeStyles((theme: Theme) => ({
  list: {
    paddingBlock: theme.spacing(2),
  },
  item: {
    border: "solid 1px " + theme.palette.grey["A100"],
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
}));
type P = {
  model: QuizModelType;
  onSelect(): void;
  onDelete(): void;
  active: boolean;
};
const Item = ({ model, active, onDelete, onSelect }: P) => {
  const { setSelected } = useQuizPaginator();
  const classes = useClasses();
  return (
    <>
      <ListItem className={classes.item} selected={active}>
        <ListItemText
          secondaryTypographyProps={{
            component: "div",
          }}
          secondary={
            <>
              <div>{model.question}</div>
              <Tooltip title="Hapus quis">
                <Button size="small" color="secondary" onClick={onDelete}>
                  <Delete />
                </Button>
              </Tooltip>
              <Tooltip title="Tampilkan quis">
                <Button size="small" color="primary" onClick={onSelect}>
                  <Book />
                </Button>
              </Tooltip>
            </>
          }
          primary={`${model.typeLabel} | ${getDurationTimeText(
            model.show_at as number
          )}`}
        />
      </ListItem>
    </>
  );
};

export const QuizList = () => {
  const {
    data,
    selected,
    prev,
    prevDisabled,
    nextDisabled,
    next,
    setSelected,
    modeHandler,
  } = useStore();
  const onDelete = (item: QuizModelType) => {
    return () => {
      setSelected(item);
      modeHandler("delete");
    };
  };
  const onSelect = (item: QuizModelType) => {
    return () => {
      setSelected(item);
    };
  };

  return (
    <Box padding={2}>
      <List>
        {data.map((item) => (
          <Item
            onSelect={onSelect(item)}
            onDelete={onDelete(item)}
            active={Boolean(selected && selected.id === item.id)}
            model={item}
            key={item.id}
          />
        ))}
      </List>
      <Button onClick={prev} disabled={prevDisabled}>
        Sebelumnya
      </Button>
      <Button onClick={next} disabled={nextDisabled}>
        Selanjutnya
      </Button>
    </Box>
  );
};

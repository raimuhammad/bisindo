/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import Data from "root/image-data.json";
import { sample, chain, shuffle } from "lodash";

const useClasses = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "60%",
    textAlign: "center",
  },
  optionContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  option: {
    width: "50%",
    marginBottom: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    padding: theme.spacing(1),
    width: "100%",
  },
  button: {
    width: "100%",
    fontSize: "2rem",
    padding: theme.spacing(1),
    "&:hover,&[aria-selected='true']": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    transition: "all ease .3s",
  },
}));
export const QuestionQuiz = () => {
  type Item = typeof Data[number];

  const [question] = React.useState<Item>(sample(Data) as Item);
  const wrongs = chain<Item>(Data)
    // @ts-ignore
    .filter(({ id }) => id !== question.id)
    .sampleSize(3)
    .value();
  const [options] = React.useState<Array<Item>>(() => {
    return shuffle([...wrongs, question]) as Array<Item>;
  });
  const [answer, setAnswer] = React.useState<Item | null>(null);
  const handler = (item: Item) => {
    return () => {
      setAnswer(item);
    };
  };
  const classes = useClasses();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography align="center" variant="h3">
          Apakah huruf untuk gambar di bawah ini ?
        </Typography>
        <img src={question.image} />
        <div className={classes.optionContainer}>
          {options.map((item) => (
            <div key={item.id} className={classes.option}>
              <div className={classes.buttonContainer}>
                <Button
                  onClick={handler(item)}
                  aria-selected={Boolean(answer && answer.id === item.id)}
                  className={classes.button}
                  variant="outlined"
                  size="large"
                >
                  {item.letter}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button color="primary" variant="contained">
          Konfirmasi jawaban
        </Button>
      </div>
    </div>
  );
};

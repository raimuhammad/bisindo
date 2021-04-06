import * as React from "react";
import Data from "../../quis-1.json";
import { Button, Container, makeStyles, Paper, Theme } from "@material-ui/core";

const useClasses = makeStyles((theme: Theme) => ({
  box: {
    fontSize: "5rem",
    width: "30%",
    textAlign: "center",
    marginTop: "3rem",
    cursor: "pointer",
    '&[aria-selected="true"]': {
      backgroundColor: theme.palette.primary.dark,
      color: "white",
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: "white",
    },
    transition: "all ease .3s",
  },
  container: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

export const ChoiseQuiz = () => {
  const classes = useClasses();

  const [answer, setAnswer] = React.useState("");

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "3rem" }}>{Data.question}</h1>
      <Container className={classes.container}>
        {Data.options.map((item) => (
          <Paper
            onClick={() => setAnswer(item)}
            key={item}
            aria-selected={answer === item}
            className={classes.box}
          >
            {item}
          </Paper>
        ))}
      </Container>
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <Button
          size="large"
          disabled={!answer}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

import * as React from "react";
import {
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { AppBar, Toolbar } from "@material-ui/core";
import { Search } from "@material-ui/icons";

type Props = {};

const useClasses = makeStyles((theme: Theme) => ({
  root: {},
  toolbar: {
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    alignItems: "center",
  },
  input: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    padding: theme.spacing(1),
    "& > .MuiInput-root": {
      padding: theme.spacing(0.8),
      width: 300,
      borderRadius: 10,
      paddingInline: 10,
      backgroundColor: "#b5cee7",
      "& > input::placeholder": {
        color: "white",
        opacity: 1,
      },
      "& > .MuiInputAdornment-root": {
        color: "white",
      },
      "&.Mui-focused": {
        width: 500,
        "& > input::placeholder": {
          color: "#000",
          opacity: 0.5,
        },
        backgroundColor: "white",
        "& > .MuiInputAdornment-root": {
          color: "#454545",
        },
        boxShadow: theme.shadows[2],
      },
      transition: "all ease .3s",
    },
    marginInline: theme.spacing(2),
  },
}));

export const Header = (props: Props) => {
  const classes = useClasses();
  const meta = document
    .getElementsByName("app-name")[0]
    .getAttribute("content");
  return (
    <AppBar variant="outlined" position="static">
      <Toolbar className={classes.toolbar}>
        <h1>{meta ?? "Laravel"}</h1>
        <TextField
          placeholder="Pencarian"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          className={classes.input}
        />
      </Toolbar>
    </AppBar>
  );
};

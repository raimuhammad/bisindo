import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  InputAdornment,
  InputBase,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

const useClasses = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  fromFlex: {
    display: "flex",
    flexGrow: 1,
  },
  formContainer: {
    borderRadius: theme.shape.borderRadius,
    paddingInline: theme.spacing(2),
    width: "30%",
    "&:hover, &.Mui-focused": {
      width: "50%",
    },
    backgroundColor: "#90a3ea",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      "&:hover, &.Mui-focused": {
        width: "100%",
      },
    },
    transition: "all ease .3s",
    "& > .MuiInputAdornment-root svg": {
      fill: "white",
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2),
    },
    "& > input::placeholder": {
      opacity: 1,
      color: "white",
    },
    color: "white",
  },
}));

const SearchAdorment = () => (
  <InputAdornment position="start">
    <Search />
  </InputAdornment>
);

const InputProps = {
  startAdornment: <SearchAdorment />,
};

export const Header = () => {
  const classses = useClasses();
  return (
    <AppBar position="static">
      <Toolbar>
        <h1 className={classses.title}>Bisindo edu</h1>
        <div className={classses.fromFlex}>
          <InputBase
            className={classses.formContainer}
            placeholder="Pencarian"
            {...InputProps}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

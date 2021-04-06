import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { Header } from "./header";

const useClasses = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    backgroundColor: theme.palette.primary.dark,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
  },
}));

export const Base = ({ children }: React.PropsWithChildren<any>) => {
  const classes = useClasses();

  return (
    <div className={classes.root}>
      <Header />
      {children}
    </div>
  );
};

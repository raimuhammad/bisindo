import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { Header } from "./header";

const useClasses = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
  },
  content: {
    flexGrow: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
}));

export const Layout = ({ children }: React.PropsWithChildren<any>) => {
  const classes = useClasses();
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

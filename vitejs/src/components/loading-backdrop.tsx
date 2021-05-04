import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { Backdrop } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { layoutStore } from "../layout/layout.store";

type Props = {
  loading: boolean;
};

const useClasses = makeStyles((theme) => ({
  root: {
    color: "white",
    zIndex: 100,
    position: "fixed",
    flexGrow: 1,
    top: 0,
    left: 0,
  },
  container: {
    display: "flex",
    zIndex: 100,
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
  },
}));

export const LoadingBackdrop = ({ loading }: Props) => {
  const classes = useClasses();
  React.useEffect(() => {
    layoutStore.toggleAppbarStatus(loading);
  }, [loading]);
  return (
    <>
      <Backdrop className={classes.root} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

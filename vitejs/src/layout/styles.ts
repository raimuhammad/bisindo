import { makeStyles } from "@material-ui/core";

export const useClasses = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
  contanerContainer: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
  },
}));

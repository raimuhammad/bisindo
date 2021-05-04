import { makeStyles } from "@material-ui/core";

export const useClasses = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    paddingBlock: theme.spacing(2),
  },
}));

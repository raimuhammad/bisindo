import { makeStyles } from "@material-ui/core";

export const useClasses = makeStyles((theme) => ({
  root: {
    display: "flex",
    // [theme.breakpoints.down("sm")]: {
    // flexDirection: "column-reverse",
    // },
    "& > div": {
      margin: "auto",
      [theme.breakpoints.up("md")]: {
        width: "50%",
      },
    },
  },
  welcomeContainer: {
    paddingBlock: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  fieldContainer: {
    display: "flex",
    alignItems: "center",
  },
}));

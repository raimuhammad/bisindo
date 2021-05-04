import { makeStyles } from "@material-ui/core";
import { layoutStore } from "../layout.store";
import clsx from "clsx";

const drawerWidth = 240;

export const useClasses = makeStyles((theme) => ({
  userinfo: {
    "& > img": {
      borderRadius: "50%",
      width: "80%",
      "&[aria-expanded='true']": {
        width: "40%",
      },
      transition: "width ease .3s",
    },
  },
  userInfoText: {
    width: "100%",
    overflow: "hidden",
    "&[aria-expanded='false']": {
      width: 0,
      opacity: 0,
      display: "none",
    },
    transition: "all ease .3s",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    position: "static",
  },
  drawerOpen: {
    position: "static",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    position: "static",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7),
    },
  },
}));
export const useDrawerProps = () => {
  const open = layoutStore.sideBarOpen;
  const classes = useClasses();
  const className = clsx(classes.drawer, {
    [classes.drawerOpen]: open,
    [classes.drawerClose]: !open,
  });
  const drawerClasses = {
    paper: clsx({
      [classes.drawerOpen]: open,
      [classes.drawerClose]: !open,
    }),
  };
  const PaperProps = {};
  return {
    className,
    classes: drawerClasses,
    PaperProps,
  };
};

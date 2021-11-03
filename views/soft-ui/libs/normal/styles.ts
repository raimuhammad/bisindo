import { AppBarProps, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { SoftUiTheme } from "../../assets/theme";

export const root = makeStyles(() => {
  return {
    root: {
      minHeight: "100vh",
      width: "100vw",
      overflowX: "hidden",
      padding: 0,
      position: "relative",
    },
  };
});

const mobile = () => {
  return {
    "& > .logo": {
      flexGrow: 1,
    },
    position: "relative",
    "& > .menu": {
      position: "absolute",
      left: 3,
      top: "50%",
      transform: "translateY(-50%)",
    },
  };
};
const desktop = () => {
  return {};
};

export function appbarSx(): AppBarProps["sx"] {
  const {
    palette: { white, transparent },
    borders: {
      borderRadius: { xl },
    },
    boxShadows: { navbarBoxShadow },
    functions: { rgba, pxToRem },
  } = useTheme() as SoftUiTheme;
  return {
    padding: 0,
    borderRadius: xl,
    color: "black!important",
    top: {
      sm: 0,
      md: 20,
    },
    "& > .mobile": mobile(),
    "& > .desktop": desktop(),
    "& > * > .divider": {
      height: {
        sm: 0,
        md: 40,
      },
      marginX: {
        sm: 0,
        md: 2,
      },
    },
    transform: {
      md: "translate(-50%)",
      sm: "translate(50%)",
    },
    left: {
      md: "50%",
      sm: "0",
    },
    width: {
      lg: "80%",
      sm: "100%",
      md: "80%",
    },
    boxShadow: ({ transparentNavbar, absolute }: any) =>
      transparentNavbar || absolute ? "none" : navbarBoxShadow,
    backdropFilter: ({ transparentNavbar, absolute }: any) =>
      transparentNavbar || absolute ? "none" : `saturate(200%) blur(${pxToRem(30)})`,
    backgroundColor: ({ transparentNavbar, absolute }: any) =>
      transparentNavbar || absolute ? transparent.main : rgba(white.main, 0.8),
  };
}

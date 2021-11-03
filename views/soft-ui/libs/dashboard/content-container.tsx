import { styled } from "@mui/material";
import { PropsWithChildren } from "react";
import { useDashboard } from "./hoc";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }: any) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    position: "relative",
    height: "100vh",
    overflowY: "auto",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: open ? 0 : `-${250}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
export const ContentContainer = ({ children }: PropsWithChildren<any>) => {
  const {
    softUi: { miniSidenav },
    onScroll,
  } = useDashboard();
  return (
    <Main onScroll={onScroll} open={miniSidenav}>
      {children}
    </Main>
  );
};

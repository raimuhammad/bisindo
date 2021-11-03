import { makeStyles } from "@mui/styles";

export default makeStyles(({ functions, breakpoints, transitions }: any) => {
  const { pxToRem } = functions;
  return {
    layoutContainer: {
      position: "relative",
      padding: pxToRem(24),
      [breakpoints.up("xl")]: {
        marginLeft: ({ direction, miniSidenav }: any) => {
          if (direction === "ltr") {
            return miniSidenav ? pxToRem(0) : pxToRem(50);
          }

          return false;
        },
        marginRight: ({ direction, miniSidenav }: any) => {
          if (direction === "rtl") {
            return miniSidenav ? pxToRem(0) : pxToRem(50);
          }

          return false;
        },
        transition: transitions.create(["margin-left", "margin-right"], {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),
      },
    },
  };
});

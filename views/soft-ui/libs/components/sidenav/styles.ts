import { makeStyles } from "@mui/styles";

export const useSidenavStyles = makeStyles(
  ({ palette, typography, boxShadows, transitions, breakpoints, functions }: any) => {
    const sidebarWidth = 250;
    const { white, transparent } = palette;
    const { fontWeightMedium } = typography;
    const { xxl } = boxShadows;
    const { pxToRem } = functions;

    return {
      sidenav: {
        boxShadow: xxl,
        border: "none",
        [breakpoints.up("xl")]: {
          backgroundColor: ({ transparentSidenav }: any) =>
            transparentSidenav ? transparent.main : white.main,
          boxShadow: ({ transparentSidenav }: any) => (transparentSidenav ? "none" : xxl),
          marginBottom: ({ transparentSidenav }: any) => (transparentSidenav ? 0 : "inherit"),
          left: "0",
        },
      },

      sidenav_header: {
        padding: `${pxToRem(24)} ${pxToRem(32)} ${pxToRem(24)}`,
        textAlign: "center",

        "& a": {
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        },
      },

      sidenav_logo: {
        width: pxToRem(32),
      },

      sidenav_logoLabel: {
        marginLeft: pxToRem(4),
        fontWeight: fontWeightMedium,
        wordSpacing: pxToRem(-1),
        transition: transitions.create("opacity", {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),

        [breakpoints.up("xl")]: {
          opacity: ({ miniSidenav }: any) => (miniSidenav ? 0 : 1),
        },
      },

      sidenav_title: {
        display: "block",
        opacity: 0.6,
        paddingLeft: pxToRem(24),
        margin: `${pxToRem(16)} 0 ${pxToRem(8)} ${pxToRem(8)}`,
      },

      marginTopNone: {
        marginTop: 0,
      },

      sidenav_footer: {
        margin: `auto ${pxToRem(16)} ${pxToRem(16)}`,
        paddingTop: pxToRem(16),
      },

      sidenav_open: {
        transform: "translateX(0)",
        transition: transitions.create("transform", {
          easing: transitions.easing.sharp,
          duration: transitions.duration.shorter,
        }),
        [breakpoints.up("xl")]: {
          width: sidebarWidth,
          transform: "translateX(0)",
          transition: transitions.create(["width", "background-color"], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.enteringScreen,
          }),
        },
      },
      sidenav_close: {
        transform: `translateX(${pxToRem(-310)})`,
        transition: transitions.create("transform", {
          easing: transitions.easing.sharp,
          duration: transitions.duration.shorter,
        }),

        [breakpoints.up("xl")]: {
          width: pxToRem(120),
          overflowX: "hidden",
          transform: "translateX(0)",
          transition: transitions.create(["width", "background-color"], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.shorter,
          }),
        },
      },

      sidenav_navlink: {
        textDecoration: "none",
      },
    };
  }
);

export const collapseStyles = makeStyles(
  ({ palette, transitions, breakpoints, typography, boxShadows, borders, functions }: any) => {
    const { dark, white, info, text, gradients, light, transparent } = palette;
    const { fontWeightRegular, fontWeightMedium, size } = typography;
    const { regular, xxl } = boxShadows;
    const { borderRadius } = borders;
    const { pxToRem } = functions;

    return {
      collapse_item: {
        backgroundColor: ({ active }: any) => {
          return active ? white.main : transparent.main;
        },
        color: ({ active }: any) => (active ? dark.main : text.main),
        display: "flex",
        alignItems: "center",
        width: ({ miniSidenav, active }: any) => {
          if (active && miniSidenav) {
            return "fit-content";
          }
          return "100%";
        },
        padding: `${pxToRem(10.8)} ${pxToRem(12.8)} ${pxToRem(10.8)} ${pxToRem(16)}`,
        margin: `0 ${pxToRem(16)}`,
        borderRadius: borderRadius.lg,
        cursor: "pointer",
        userSelect: "none",
        whiteSpace: "nowrap",
        boxShadow: "none",
        [breakpoints.up("xl")]: {
          boxShadow: ({ active, transparentSidenav }: any) => {
            if (active) {
              return transparentSidenav ? xxl : "none";
            }

            return "none";
          },
          transition: transitions.create("box-shadow", {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.shorter,
          }),
        },
      },

      collapse_iconBox: {
        background: ({ active, sidenavColor }: any) => {
          if (active) {
            return sidenavColor === "default" ? info.main : palette[sidenavColor].main;
          }

          return light.main;
        },
        minWidth: pxToRem(32),
        minHeight: pxToRem(32),
        borderRadius: borderRadius.md,
        display: "grid",
        placeItems: "center",
        boxShadow: regular,
        transition: transitions.create("margin", {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),

        [breakpoints.up("xl")]: {
          background: ({ active, transparentSidenav, sidenavColor }: any) => {
            let background;

            if (!active) {
              background = transparentSidenav ? white.main : light.main;
            } else if (sidenavColor === "default") {
              background = info.main;
            } else if (sidenavColor === "warning") {
              background = gradients.warning.main;
            } else {
              background = palette[sidenavColor].main;
            }

            return background;
          },
        },

        "& svg, svg g": {
          fill: ({ active }: any) => (active ? white.main : gradients.dark.state),
        },
      },

      collapse_icon: {
        color: ({ active }: any) => (active ? white.main : gradients.dark.state),
      },

      collapse_text: {
        marginLeft: pxToRem(12.8),

        [breakpoints.up("xl")]: {
          opacity: ({ miniSidenav, transparentSidenav }: any) =>
            miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
          maxWidth: ({ miniSidenav, transparentSidenav }: any) =>
            miniSidenav || (miniSidenav && transparentSidenav) ? 0 : "100%",
          marginLeft: ({ miniSidenav, transparentSidenav }: any) =>
            miniSidenav || (miniSidenav && transparentSidenav) ? 0 : pxToRem(12.8),
          transition: transitions.create(["opacity", "margin"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },

        "& span": {
          fontWeight: ({ active }: any) => (active ? fontWeightMedium : fontWeightRegular),
          fontSize: size.sm,
          lineHeight: 0,
        },
      },
    };
  }
);

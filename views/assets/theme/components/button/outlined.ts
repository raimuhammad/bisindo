import colors from "@colors";
import typography from "@typography";
import boxShadows from "@box-shadow";
import pxToRem from "@theme-functions/pxToRem";

// Soft UI Dashboard PRO React Helper Functions

const { transparent, light, info, secondary } = colors;
const { size } = typography;
const { buttonBoxShadow } = boxShadows;

export default {
  base: {
    minHeight: pxToRem(42),
    color: light.main,
    borderColor: light.main,
    padding: `${pxToRem(12)} ${pxToRem(24)}`,

    "&:hover": {
      opacity: 0.75,
      backgroundColor: transparent.main,
    },

    "&:focus:not(:hover)": {
      boxShadow: buttonBoxShadow.stateOfNotHover,
    },

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(16)} !important`,
    },
  },

  small: {
    minHeight: pxToRem(34),
    padding: `${pxToRem(8)} ${pxToRem(32)}`,
    fontSize: size.xs,

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(12)} !important`,
    },
  },

  large: {
    minHeight: pxToRem(49),
    padding: `${pxToRem(14)} ${pxToRem(64)}`,
    fontSize: size.sm,

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(22)} !important`,
    },
  },

  primary: {
    backgroundColor: transparent.main,
    borderColor: info.main,

    "&:hover": {
      backgroundColor: transparent.main,
    },

    "&:focus:not(:hover)": {
      boxShadow: buttonBoxShadow.stateOfNotHover,
    },
  },

  secondary: {
    backgroundColor: transparent.main,
    borderColor: secondary.main,

    "&:hover": {
      backgroundColor: transparent.main,
    },

    "&:focus:not(:hover)": {
      boxShadow: buttonBoxShadow.stateOfNotHover,
    },
  },
};

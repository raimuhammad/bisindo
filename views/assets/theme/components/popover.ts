import boxShadows from "@box-shadow";
import colors from "@colors";
import borders from "@borders";
import pxToRem from "@theme-functions/pxToRem";
const { transparent } = colors;
const { lg } = boxShadows;
const { borderRadius } = borders;

export default {
  styleOverrides: {
    paper: {
      backgroundColor: transparent.main,
      boxShadow: lg,
      padding: pxToRem(8),
      borderRadius: borderRadius.lg,
    },
  },
};

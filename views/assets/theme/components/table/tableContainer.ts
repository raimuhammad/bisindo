import boxShadows from "@box-shadow";
import colors from "@colors";
import borders from "@borders";
const { white } = colors;
const { xxl } = boxShadows;
const { borderRadius } = borders;

export default {
  styleOverrides: {
    root: {
      backgroundColor: white.main,
      boxShadow: xxl,
      borderRadius: borderRadius.xl,
    },
  },
};

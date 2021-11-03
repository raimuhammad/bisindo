import { makeStyles } from "@mui/styles";

export const useClasses = makeStyles(({ palette, typography, functions }: any) => {
  const { gradients, transparent } = palette;
  const { fontWeightLight, fontWeightRegular, fontWeightMedium, fontWeightBold } = typography;
  const { linearGradient } = functions;
  return {
    suiTypography: {
      color: ({ textColor }: any) =>
        textColor === "inherit" ? "inherit" : palette[textColor].main,
      opacity: ({ opacity }: any) => opacity,
      textDecoration: "none",
    },

    suiTypography_light: {
      fontWeight: fontWeightLight,
    },

    suiTypography_regular: {
      fontWeight: fontWeightRegular,
    },

    suiTypography_medium: {
      fontWeight: fontWeightMedium,
    },

    suiTypography_bold: {
      fontWeight: fontWeightBold,
    },

    suiTypography_textTransform: {
      textTransform: ({ textTransform }: any) => textTransform,
    },

    suiTypography_verticalAlign: {
      verticalAlign: ({ verticalAlign }: any) => verticalAlign,
    },

    suiTypography_textGradient: {
      backgroundImage: ({ textColor }: any) =>
        textColor !== "inherit" &&
        textColor !== "text" &&
        textColor !== "white" &&
        linearGradient(gradients[textColor].main, gradients[textColor].state),
      display: "inline-block",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: transparent.main,
      position: "relative",
      zIndex: 1,
    },
  };
});

import { makeStyles } from "@mui/styles";
import { CSSProperties } from "react";

const validGradients = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
  "dark",
  "light",
];

export type ValidGradient = typeof validGradients[number];

const validColors = [
  "transparent",
  "white",
  "black",
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
  "light",
  "dark",
  "text",
  "grey-100",
  "grey-200",
  "grey-300",
  "grey-400",
  "grey-500",
  "grey-600",
  "grey-700",
  "grey-800",
  "grey-900",
];

export type ValidColor = typeof validColors[number] | CSSProperties["color"];

const validBorderRadius = ["xs", "sm", "md", "lg", "xl", "xxl", "section"];

const validBoxShadows = ["xs", "sm", "regular", "lg", "xl", "xxl", "inset"];

const getGreyColors = (grey: any) => ({
  "grey-100": grey[100],
  "grey-200": grey[200],
  "grey-300": grey[300],
  "grey-400": grey[400],
  "grey-500": grey[500],
  "grey-600": grey[600],
  "grey-700": grey[700],
  "grey-800": grey[800],
  "grey-900": grey[900],
});

export const useClasses = makeStyles(({ palette, functions, borders, boxShadows }: any) => {
  const { gradients, grey } = palette;
  const greyColors = getGreyColors(grey);

  const { linearGradient } = functions;
  const { borderRadius: radius } = borders;
  return {
    suiBox: {
      opacity: ({ opacity }: any) => opacity,
      backgroundColor: ({ backgroundColor }: any) => {
        let backgroundColorValue;

        if (validColors.find((el) => el === backgroundColor)) {
          backgroundColorValue = palette[backgroundColor]
            ? palette[backgroundColor].main
            : greyColors[backgroundColor];
        } else {
          backgroundColorValue = backgroundColor;
        }

        return backgroundColorValue;
      },
      color: ({ color }: any) => {
        let colorValue;

        if (validColors.find((el) => el === color)) {
          colorValue = palette[color] ? palette[color].main : greyColors[color];
        } else {
          colorValue = color;
        }

        return colorValue;
      },
      borderRadius: ({ borderRadius }: any) => {
        let borderRadiusValue;

        if (validBorderRadius.find((el) => el === borderRadius)) {
          borderRadiusValue = radius[borderRadius];
        } else {
          borderRadiusValue = borderRadius;
        }

        return borderRadiusValue;
      },
      boxShadow: ({ boxShadow }: any) => {
        let boxShadowValue;

        if (validBoxShadows.find((el) => el === boxShadow)) {
          boxShadowValue = boxShadows[boxShadow];
        } else {
          boxShadowValue = boxShadows;
        }

        return boxShadowValue;
      },
    },

    suiBox_backgroundGradient: {
      backgroundImage: ({ backgroundColor }: any) => {
        let backgroundValue;

        if (validGradients.find((el) => el === backgroundColor)) {
          backgroundValue = linearGradient(
            gradients[backgroundColor].main,
            gradients[backgroundColor].state
          );
        } else {
          backgroundValue = "none";
        }

        return backgroundValue;
      },
    },
  };
});

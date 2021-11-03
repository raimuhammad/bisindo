import type { ComponentType, CSSProperties } from "react";
import { forwardRef } from "react";
import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";
import type { ValidColor, ValidGradient } from "./styles";
import { useClasses } from "./styles";
import clsx from "clsx";

type Props = {
  backgroundColor?: CSSProperties["background"];
  backgroundGradient?: ValidGradient;
  color?: ValidColor;
  opacity?: number;
  borderRadius?: CSSProperties["borderRadius"];
  boxShadow?: number | CSSProperties["boxShadow"];
  customClass?: string;
} & BoxProps;

export const SuiBox: ComponentType<Props> = forwardRef(
  (
    {
      backgroundColor = "transparent",
      backgroundGradient = "none",
      color = "dark",
      opacity = 1,
      borderRadius = "none",
      boxShadow = "none",
      customClass = "",
      children,
      ...rest
    },
    ref
  ) => {
    const classes = useClasses({ backgroundColor, color, opacity, borderRadius, boxShadow });
    return (
      <Box
        ref={ref}
        className={clsx(classes.suiBox, customClass, {
          [classes.suiBox_backgroundGradient]: backgroundGradient,
        })}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);

import { useClasses } from "./styles";
import { Typography, TypographyProps } from "@mui/material";
import clsx from "clsx";
import type { ComponentType, CSSProperties } from "react";
import { forwardRef } from "react";

type Props = {
  textColor?:
    | "inherit"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark"
    | "text"
    | "white";
  fontWeight?: "light" | "regular" | "medium" | "bold";
  textTransform?: CSSProperties["textTransform"];
  verticalAlign?:
    | "unset"
    | "baseline"
    | "sub"
    | "super"
    | "text-top"
    | "text-bottom"
    | "middle"
    | "top"
    | "bottom";
  textGradient?: boolean;
  opacity?: number;
  customClass?: string;
} & TypographyProps;

export const SuiTypography: ComponentType<Props> = forwardRef(
  (
    {
      textColor = "dark",
      fontWeight = "regular",
      textTransform = "none",
      verticalAlign = "unset",
      textGradient = false,
      opacity = 1,
      customClass = "",
      children,
      ...rest
    }: Props,
    ref: any
  ) => {
    const classes = useClasses({ textColor, textTransform, verticalAlign, opacity });

    return (
      <Typography
        {...rest}
        ref={ref}
        className={clsx(classes.suiTypography, customClass, {
          [classes[`suiTypography_${fontWeight}`]]: fontWeight,
          [classes.suiTypography_textTransform]: textTransform,
          [classes.suiTypography_verticalAlign]: verticalAlign,
          [classes.suiTypography_textGradient]: textGradient,
        })}
      >
        {children}
      </Typography>
    );
  }
);

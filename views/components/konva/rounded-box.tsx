import * as React from "react";
import { useCallback } from "react";
import { useTheme } from "@mui/material";
import { Group } from "react-konva";

type Props = React.ComponentProps<typeof Group> & {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const RoundedBox = ({
  x,
  y,
  height,
  width,
  ...rest
}: Props) => {
  const theme = useTheme();
  const cornerRadius = theme.shape.borderRadius;
  const clipFunc = useCallback((ctx: any) => {
    ctx.beginPath();
    ctx.moveTo(x + cornerRadius, y);
    ctx.lineTo(x + width - cornerRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius);
    ctx.lineTo(x + width, y + height - cornerRadius);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - cornerRadius,
      y + height
    );
    ctx.lineTo(x + cornerRadius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius);
    ctx.lineTo(x, y + cornerRadius);
    ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
    ctx.closePath();
  }, []);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Group {...rest} clipFunc={clipFunc} />;
};

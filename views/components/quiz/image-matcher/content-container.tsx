import * as React from "react";
import { useKonva } from "@providers/konva/konva-provider";
import { Group, Rect } from "react-konva";
import { useTheme } from "@material-ui/core";
import voca from "voca";

type Props = {
  index: number;
  fill: string;
  height: number;
  align: "left" | "right";
  type: "TEXT" | "IMAGE";
  id: string;
  handler?(e: any): void;
  children(args: { height: number; width: number }): React.ReactNode;
} & Record<string, any>;
export const ContentContainer = ({
  index,
  id,
  fill,
  handler,
  children,
  height,
  align,
  type,
  ...rest
}: Props) => {
  const i = index;
  const y = i * height;
  const theme = useTheme();
  const { stageWidth } = useKonva();

  const getX = () => {
    const map = {
      left: theme.spacing(1),
      right: stageWidth - theme.spacing(1) - height,
    };
    return map[align];
  };

  return (
    <Group
      data-type={type}
      data-id={voca(`${id}-${type}`).lowerCase().value()}
      onTouchStart={handler}
      onDragStart={handler}
      onMouseDown={handler}
      y={y}
      x={getX()}
      height={height}
      width={height}
      {...rest}
    >
      <Rect height={height} width={height} fill={fill} />
      {children({ height, width: height })}
    </Group>
  );
};

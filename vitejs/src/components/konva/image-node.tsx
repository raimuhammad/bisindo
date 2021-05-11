import * as React from "react";
import useImage from "use-image";
import { Group, Image } from "react-konva";
import { NodeProps } from "./types";

type Props = NodeProps<{
  radius?: number;
  src: string;
}> &
  Record<string, any>;

export const ImageNode = ({
  radius = 4,
  src,
  x,
  y,
  width,
  height,
  ...rest
}: Props) => {
  const [img] = useImage(src);
  if (img) {
    img.width = width;
    img.height = height;
  }
  return (
    <Group x={x} y={y} height={height} width={width} {...rest}>
      <Image image={img} width={width} height={height} fill="blue" />
    </Group>
  );
};

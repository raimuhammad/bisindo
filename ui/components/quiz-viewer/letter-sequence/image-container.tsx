import { Rect, Text, Group, Image } from "react-konva";
import { useLetterContext } from "./provider";
import { useKonva } from "../konva-provider";
import { useTheme } from "@mui/material";
import { makeDragHandler } from "./utils";
import Konva from "konva";
import { useEffect, useRef } from "react";
import useImage from "use-image";

export const ImageContainer = ({ index, text }: any) => {
  const { stage } = useKonva();
  const { getNodeState, swap, mode, enableDrag } = useLetterContext();
  const [node] = getNodeState(index);
  const src = "/letters/" + text.toLocaleLowerCase() + "0.png";
  const theme = useTheme();
  const ref = useRef<Konva.Group>(null);
  const [img] = useImage(src);
  useEffect(() => {
    if (ref.current) {
      ref.current.to({
        x: node.x,
        y: node.y,
        duration: 0.2,
      });
    }
  }, [ref.current, node]);
  const onDragEnd = makeDragHandler({
    stage: stage.current as any,
    target: index,
    original: node,
    swap,
  });
  return (
    <Group
      {...node}
      id={node.id}
      ref={ref}
      onDragEnd={enableDrag ? onDragEnd : undefined}
      draggable={enableDrag}
    >
      <Rect
        width={node.width}
        height={node.height}
        cornerRadius={12}
        strokeWidth={1}
        stroke={theme.palette.primary.main}
      />
      {mode === "image" ? (
        <Image image={img} height={node.height} width={node.width} />
      ) : (
        <Text
          fill="black"
          fontSize={node.height - 10}
          align="center"
          width={node.width}
          text={text}
        />
      )}
    </Group>
  );
};

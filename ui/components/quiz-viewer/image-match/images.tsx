import { ImageNode } from "./types";
import { Group, Rect, Text, Image } from "react-konva";
import { useTheme } from "@mui/material";
import { useKonva } from "@components/quiz-viewer/konva-provider";
import { useImageMatch } from "./provider";
import useImage from "use-image";

type Props = {
  items: ImageNode[];
  pos?: "start" | "end";
};

const ImageContainer = ({
  x,
  y,
  bg,
  text,
  width,
  height,
  pos,
  index,
  hasArrow,
}: ImageNode & { pos: Props["pos"]; index: number }) => {
  const theme = useTheme();
  const { stage } = useKonva();
  const { arrows } = useImageMatch();
  const bottom = (stage.current as any).height();
  const { mouseHandler } = useImageMatch();
  const mouseCallback = mouseHandler(index);
  const role = pos === "start" ? "text" : "image";
  const src = "/letters/" + text.toLocaleLowerCase() + "0.png";
  const [img] = useImage(src);
  const id = `item-${role}-${index}`;
  const hasArrowPointed = arrows.find((item) => item.toId === id);

  const getFill = () => {
    if (hasArrowPointed || role === "text") {
      return hasArrowPointed ? hasArrowPointed.bg : bg;
    }
    return theme.palette.grey["200"];
  };

  return (
    <Group
      id={`item-${role}-${index}`}
      data-letter={text}
      data-role={role}
      height={height}
      width={width}
      onTouchStart={role === "image" ? undefined : mouseCallback}
      onDragStart={role === "image" ? undefined : mouseCallback}
      onMouseDown={role === "image" ? undefined : mouseCallback}
      x={x}
      y={pos === "start" ? 0 : bottom - (height + 20)}
    >
      <Rect height={height} width={width} fill={getFill()} />
      {/*<Text*/}
      {/*  text={text}*/}
      {/*  fill="white"*/}
      {/*  height={height}*/}
      {/*  fontSize={height}*/}
      {/*  width={width}*/}
      {/*  align="center"*/}
      {/*/>*/}
      {role === "image" ? (
        <Image height={height} width={width} image={img} />
      ) : (
        <Text
          text={text}
          fill="white"
          height={height}
          fontSize={height}
          width={width}
          align="center"
        />
      )}
    </Group>
  );
};

export const Images = ({ pos = "start", items }: Props) => {
  return (
    <>
      {items.map((item, index) => (
        <ImageContainer {...item} index={index} key={item.id} pos={pos} />
      ))}
    </>
  );
};

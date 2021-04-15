import * as React from "react";
import { useKonvaResponsive } from "hooks/use-konva-responsive";
import { useGetXyPos } from "components/quiz/image-matcher/utility";
import { Group, Image, Text } from "react-konva";
import useImage from "use-image";
import { Item } from "./types";
import { ImageNode } from "components/konva/image-node";

const isDev = false;

export const ImageContainer = (props: Item & { itemIndex: number }) => {
  const {
    itemIndex,
    textColor,
    question: { letter, image, id },
  } = props;
  const dimension = useKonvaResponsive(20, true);
  const pos = useGetXyPos(dimension.height, itemIndex, true);
  const [src] = useImage(image);
  return (
    <ImageNode
      src={image}
      {...pos}
      {...dimension}
      role="image"
      itemLetter={props.question.letter}
      data-content={JSON.stringify(props)}
      itemId={`image-${id}`}
    />
  );
  // return (
  //   <Group
  //     role="image"
  //     itemLetter={props.question.letter}
  //     data-content={JSON.stringify(props)}
  //     itemId={`image-${id}`}
  //     {...dimension}
  //     {...pos}
  //   >
  //     {isDev ? (
  //       <Text
  //         verticalAlign="center"
  //         align="center"
  //         fontSize={(dimension.height * dimension.width) / dimension.height}
  //         {...dimension}
  //         text={letter}
  //         fill={textColor}
  //       />
  //     ) : (
  //       <Image {...dimension} image={src} />
  //     )}
  //   </Group>
  // );
};

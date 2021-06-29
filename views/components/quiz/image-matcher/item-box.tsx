import * as React from "react";
import { ContentContainer } from "./content-container";
import { useStore } from "./image-match-provider";
import { useKonva } from "@providers/konva/konva-provider";
import { Image, Text } from "react-konva";
import useImage from "use-image";
import { BoxItem } from "./types";

function useDimension() {
  const { stageHeight } = useKonva();
  const { items } = useStore();
  const percent = 100 / items.length;
  return {
    height: (percent / 100) * stageHeight,
  };
}

type ItemBoxProps = {
  alignment?: "left" | "right";
  type?: "TEXT" | "IMAGE";
};

const ImageNode = ({ image, height }: BoxItem & { height: number }) => {
  const [src] = useImage(image);
  return <Image image={src} width={height} height={height} fill="white" />;
};

export const ItemBox = ({
  alignment = "left",
  type = "TEXT",
}: ItemBoxProps) => {
  const { letterHandler, items, shufledItems } = useStore();
  const dimension = useDimension();
  const isImage = type === "IMAGE";

  return (
    <>
      {(isImage ? shufledItems : items).map((item, index) => (
        <ContentContainer
          {...dimension}
          data-color={item.bgColor}
          data-letter={item.letter}
          type={type}
          id={`${item.id}-${isImage ? "image" : "text"}`}
          align={alignment}
          key={item.id}
          index={index}
          fill={item.bgColor}
          handler={letterHandler}
        >
          {({ height }) =>
            !isImage ? (
              <Text
                align="center"
                verticalAlign="middle"
                text={item.letter}
                height={height}
                width={height}
                fontSize={height - 20}
                fill="white"
              />
            ) : (
              <ImageNode height={height} {...item} />
            )
          }
        </ContentContainer>
      ))}
    </>
  );
};

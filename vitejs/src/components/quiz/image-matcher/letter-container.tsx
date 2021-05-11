import * as React from "react";
import { useImageMatcher } from "./image-matcher-provider";
import { useKonvaResponsive } from "hooks/use-konva-responsive";
import { useGetXyPos } from "components/quiz/image-matcher/utility";
import { useTheme } from "@material-ui/core";
import { Group, Rect, Text } from "react-konva";
import { Item } from "./types";

export const LetterContainer = (props: Item & { itemIndex: number }) => {
  const { letter, itemIndex, bgColor, textColor } = props;
  const dimension = useKonvaResponsive(20, true);
  const pos = useGetXyPos(dimension.height, itemIndex);
  const theme = useTheme();
  const { registerHandler } = useImageMatcher();
  const handler = registerHandler(props);
  return (
    <Group
      {...pos}
      {...dimension}
      role="letter"
      data-content={JSON.stringify(props)}
      itemLetter={props.letter}
      itemId={`letter-${props.id}`}
      onTouchStart={handler}
      onDragStart={handler}
      onMouseDown={handler}
    >
      <Rect
        fill={bgColor}
        cornerRadius={theme.shape.borderRadius}
        shadowEnabled
        shadowOffsetX={2}
        shadowBlur={4}
        shadowOffsetY={1}
        shadowColor="black"
        {...dimension}
      />
      <Text
        verticalAlign="center"
        align="center"
        fontSize={(dimension.height * dimension.width) / dimension.height}
        {...dimension}
        text={letter}
        fill={textColor}
      />
    </Group>
  );
};

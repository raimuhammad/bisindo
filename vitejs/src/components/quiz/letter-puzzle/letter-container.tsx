import * as React from "react";
import { Group, Image, Rect, Text } from "react-konva";
import { observer } from "mobx-react";
import useImage from "use-image";
import { ILetterItem } from "./types";
import { useLetterItem } from "components/quiz/letter-puzzle/letter-puzzle-provider";

const showLetter = false;

export const LetterContainer = observer((props: ILetterItem) => {
  const { itemIndex, letter, id, src } = props;
  const { createHandler, getPos } = useLetterItem();
  const { onDragEnd, onDragStart } = createHandler(props);
  const pos = getPos(props);
  const [img] = useImage(src);
  return (
    <Group
      itemId={id}
      itemIndex={itemIndex}
      onMouseDown={onDragStart}
      onDragEnd={onDragEnd}
      draggable
      role="letter"
      content={JSON.stringify(props)}
      {...pos}
    >
      <Rect strokeWidth={3} height={pos.height} width={pos.width} />
      {!showLetter ? (
        <Image
          image={img}
          lineCap="round"
          lineJoin="round"
          height={pos.height - 10}
          width={pos.width - 10}
        />
      ) : (
        <Text
          text={letter}
          fontSize={pos.width / 2}
          height={pos.height - 10}
          width={pos.width - 10}
        />
      )}
    </Group>
  );
});

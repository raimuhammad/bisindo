import * as React from "react";
import { WithQuestion } from "components/quiz/image-quiz/types";
import { Image, Group, Rect, Text } from "react-konva";
import { useStage } from "components/quiz/image-quiz/provider";
import useImage from "use-image";

const ItemText = ({ questionLetter, ...rest }: WithQuestion) => {
  const { getXyPos, onLetterGroupClick } = useStage(true);
  const { x, y } = getXyPos(rest, false);
  return (
    <Group
      id={`letter-quiz-${rest.id}`}
      onDragStart={onLetterGroupClick}
      onMouseDown={onLetterGroupClick}
      x={x}
      y={y}
    >
      <Rect width={100} height={100} fill="red" />
      <Text
        verticalAlign="middle"
        align="center"
        height={100}
        width={100}
        fontSize={50}
        text={questionLetter}
        fill="black"
      />
    </Group>
  );
};
const ItemImage = (props: WithQuestion) => {
  const { image: src, id } = props;
  const [image] = useImage(src, "Anonymous");
  const { getXyPos } = useStage(true);
  return (
    <Group
      {...getXyPos(props, true)}
      className="images"
      id={`image-quiz-${id}`}
    >
      <Image image={image} width={100} height={100} />
    </Group>
  );
};

type Props = {
  items: Array<WithQuestion>;
  isLetter: boolean;
};

export const Box = ({ isLetter, items }: Props) => {
  const Node: React.FC<WithQuestion> = isLetter ? ItemText : ItemImage;
  return (
    <>
      {items.map((item) => (
        <Node {...item} key={item.id} />
      ))}
    </>
  );
};

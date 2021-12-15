import { ArrowNode } from "./types";
import { Arrow } from "react-konva";
import { useKonva } from "@components/quiz-viewer/konva-provider";
import Konva from "konva";

type Props = {
  arrows: ArrowNode[];
  showHint: boolean;
};
export const ArrowRenderer = ({ arrows, showHint }: Props) => {
  let items = arrows;
  const {
    stage: { current },
  } = useKonva();
  if (showHint && current) {
    const startNodes = current
      .find("Group")
      .toArray()
      .filter((item) => item.getAttr("data-role") === "text");
    const endNodes = current
      .find("Group")
      .toArray()
      .filter((item) => item.getAttr("data-role") === "image");
    items = items.map((item) => {
      const startNode = startNodes.find(
        (c) => c.id() === item.fromId
      ) as Konva.Group;
      const endNode = endNodes.find((c) => c.id() === item.toId) as Konva.Group;
      return {
        ...item,
        points: [
          startNode.x() + startNode.width() / 2,
          startNode.y() + startNode.height(),
          endNode.x() + endNode.width() / 2,
          endNode.y(),
        ],
      };
    });
  }

  return (
    <>
      {items.map((item, index) => (
        <Arrow points={item.points} stroke={item.bg} key={index} />
      ))}
    </>
  );
};

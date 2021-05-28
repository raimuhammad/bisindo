import * as React from "react";
import { useStore } from "./image-match-provider";
import { Arrow, Group } from "react-konva";
import { ArrowState } from "@components/quiz/image-matcher/types";
import { transformArrowStateToNode } from "@components/quiz/image-matcher/utils";
import { useKonva } from "@providers/konva/konva-provider";
import { getFromToArrowPos } from "./utils";
import { useEffect, useState } from "react";

const Node = (props: ArrowState) => {
  const { stage } = useKonva();
  const nodes = transformArrowStateToNode(props, stage);
  const [points, setPoints] = useState<Array<number>>([]);

  useEffect(() => {
    if (nodes.from && nodes.to) {
      setPoints(getFromToArrowPos(nodes));
    }
  }, [props]);

  if (!nodes.from || !nodes.to) {
    return <></>;
  }
  return (
    <Arrow
      points={points}
      stroke={nodes.from.getAttr("data-color")}
      strokeWidth={5}
      globalCompositeOperation="source-over"
      fill={nodes.from.getAttr("data-color")}
    />
  );
};

export const ArrowRenderer = () => {
  const { arrows } = useStore();
  return (
    <Group>
      {arrows.map((item) => (
        <Node {...item} key={item.arrowId} />
      ))}
    </Group>
  );
};

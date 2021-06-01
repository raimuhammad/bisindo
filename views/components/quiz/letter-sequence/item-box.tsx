import * as React from "react";
import Konva from "konva";
import { useStore } from "./provider";
import { ItemState } from "./type";
import { Group, Image, Rect, Text } from "react-konva";
import { useEffect, useRef, useState } from "react";
import { useKonva } from "@providers/konva/konva-provider";
import useImage from "use-image";

type XyArg = {
  stageWidth: number;
  stageHeight: number;
  index: number;
  itemTotal: number;
};

const getXyPos = ({ stageHeight, stageWidth, index, itemTotal }: XyArg) => {
  const width = stageWidth / itemTotal;
  const x = width * index;
  const y = stageHeight / 2 - width / 2;
  return {
    width: width,
    y,
    x,
  };
};
const useXyPosCb = () => {
  const { items } = useStore();
  const { stageWidth, stageHeight } = useKonva();
  return (index: number) => {
    return getXyPos({
      stageWidth,
      stageHeight,
      itemTotal: items.length,
      index,
    });
  };
};

export function haveIntersection(r1: any, r2: any) {
  return !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  );
}

const ItemContainer = (props: ItemState) => {
  const { letter } = props;
  const groupRef = useRef<null | Konva.Group>(null);
  const cb = useXyPosCb();
  const [pos, setPos] = useState(cb(props.currentIndex));
  const { stage, layer } = useKonva();
  const onDragStart = (e: any) => {
    const self = e.target as Konva.Group;
    self.zIndex(8);
  };
  const { updatePos } = useStore();
  const transition = (pos: any) => {
    if (groupRef.current) {
      const g = groupRef.current as Konva.Group;
      g.to({
        ...pos,
        duration: 0.2,
      });
      setPos(pos);
    }
  };
  useEffect(() => {
    transition(cb(props.currentIndex));
    return () => {
      layer.batchDraw();
    };
  }, [props, groupRef]);
  const onDragEnd = (e: any) => {
    const self = e.target as Konva.Group;
    const siblings = stage
      .find("Group")
      .toArray()
      .filter((item) => {
        return item._id !== self._id;
      }) as Array<Konva.Group>;
    const collusionNode = siblings.find((item) => {
      return haveIntersection(self.getClientRect(), item.getClientRect());
    });
    if (collusionNode) {
      const c = collusionNode.getAttr("data-props");
      const t = self.getAttr("data-props");
      updatePos(t, c);
    } else {
      transition(cb(props.currentIndex));
    }
  };
  const { readOnly, useImage: imageMode } = useStore();
  const [src] = useImage(props.imageUrl);
  console.log(props.imageUrl)
  return (
    <Group
      data-props={props}
      onDragStart={readOnly ? undefined : onDragStart}
      onDragEnd={readOnly ? undefined : onDragEnd}
      ref={groupRef}
      {...pos}
      draggable={!readOnly}
    >
      {imageMode ? (
        <Image image={src} width={pos.width} height={pos.width} fill="blue" />
      ) : (
        <>
          <Rect height={pos.width} width={pos.width} fill="red" />
          <Text
            align="center"
            width={pos.width}
            text={letter}
            fontSize={pos.width}
          />
        </>
      )}
    </Group>
  );
};

export const ItemBox = () => {
  const { items } = useStore();
  return (
    <>
      {items.map((item) => (
        <ItemContainer {...item} key={`${item.letter}-${item.originalIndex}`} />
      ))}
    </>
  );
};

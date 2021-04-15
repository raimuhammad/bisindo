import { LegacyRef, useEffect, useRef } from "react";
import Konva from "konva";
import { useKonva } from "providers/konva/konva-provider";

type CalcPosArg = {
  stage: Konva.Stage;
  spacing: number;
  itemIndex: number;
  itemLen: number;
};

export function useZIndexListener(isActive: boolean): LegacyRef<Konva.Group> {
  const nodeRef = useRef<Konva.Group>();
  const { stage } = useKonva();
  useEffect(() => {
    if (nodeRef.current) {
      const node = nodeRef.current as Konva.Group;
      const siblingCount = stage.find("Group").length;
      node.setZIndex(!isActive ? 1 : siblingCount - 1);
    }
  }, [isActive, nodeRef]);
  return nodeRef as LegacyRef<Konva.Group>;
}
const calcDimensionProperties = (itemLen: number, stage: Konva.Stage) => {
  const size = (10 / 100) * stage.container().clientWidth;
  const getContainerWidth = () => {
    const totalSpacing = (5 / size) * itemLen;
    const totalItem = size * itemLen;
    return totalItem + totalSpacing;
  };
  const containerWidth = getContainerWidth();
  const actualSize = containerWidth / itemLen;
  const spacing = 5 / containerWidth;
  const startPos = (stage.container().clientWidth - containerWidth) / 2;
  const startNext = startPos + spacing + spacing;
  return {
    size: actualSize - spacing,
    startPos,
    containerWidth,
    startNext,
    spacing,
  };
};

export const calcPos = ({ stage, itemIndex, itemLen }: CalcPosArg) => {
  const { startPos, size, startNext } = calcDimensionProperties(itemLen, stage);
  const getInitial = () => {
    const x = itemIndex * size;
    if (!itemIndex) {
      return startPos;
    }
    return startNext + x;
  };
  const initial = getInitial();
  const centerY = stage.height() - size;
  return {
    y: centerY / 2,
    x: initial,
    height: size,
    width: size,
  };
};

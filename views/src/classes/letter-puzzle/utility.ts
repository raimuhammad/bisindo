import Konva from "konva";
import { IRect } from "./type";

export function haveIntersection(r1: IRect, r2: IRect) {
  return !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  );
}
type CalcPosArg = {
  stage: Konva.Stage;
  spacing: number;
  itemIndex: number;
  itemLen: number;
};

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

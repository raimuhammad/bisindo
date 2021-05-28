/* eslint-disable @typescript-eslint/ban-ts-comment */
import { sample, sampleSize, shuffle } from "lodash";
import Data from "root/image-data.json";
import { useTheme } from "@material-ui/core";
import { useKonva } from "providers/konva/konva-provider";
import colors from "@egoist/md-colors";
import inverseColor from "invert-color";
import Konva from "konva";
import {
  ArrowAttributes,
  ArrowNode,
  Item,
  ItemAnswer,
  NodeAttributes,
} from "./types";

function revertColor(color: string): string {
  try {
    return inverseColor(color);
  } catch (e) {
    return revertColor(color);
  }
}
const colorList: Array<string> = [];
const getColors = (): Record<"textColor" | "bgColor", string> => {
  const bgColor = sample(colorList) as string;
  try {
    return {
      bgColor,
      textColor: revertColor(bgColor),
    };
  } catch (e) {
    return getColors();
  }
};

Object.keys(colors).forEach((colorKey) => {
  if (colorKey !== "transparent") {
    // @ts-ignore
    Object.keys(colors[colorKey]).forEach((key) => {
      // @ts-ignore
      colorList.push(colors[colorKey][key]);
    });
  }
});
export function getRandomData(): Item[] {
  const samples = sampleSize(Data, 4) as Array<Item["question"]>;
  const shufled = shuffle(samples) as Array<Item["question"]>;
  return samples.map(
    (item, index): Item => {
      return {
        ...item,
        ...getColors(),
        question: shufled[index],
      };
    }
  );
}

export function useSimulations() {
  const data = getRandomData();
  const mapping = (item: Item): ItemAnswer => ({
    itemAnswer: item.letter,
    itemQuestion: item.letter,
  });
  const withAnswer = false;
  const answers = data.map(mapping);
  return {
    data,
    answers: withAnswer ? answers : [],
  };
}

export function useGetXyPos(
  dimension: number,
  itemIndex: number,
  isEnd = false
): Record<"x" | "y", number> {
  const theme = useTheme();
  const space = theme.spacing(3);
  const { stageDimension } = useKonva();
  const getX = () => {
    if (isEnd) {
      return stageDimension.width - dimension - space;
    }
    return space;
  };
  const getY = () => {
    const base = (dimension + space) * itemIndex;
    return base + space;
  };
  return {
    y: getY(),
    x: getX(),
  };
}

export const arrowFactory = (bgColor: string, points: Array<number>) => {
  return new Konva.Arrow({
    stroke: bgColor,
    strokeWidth: 5,
    globalCompositeOperation: "source-over",
    points,
  });
};

export const getLetterArrowPointerPos = (target: Konva.Group) => {
  const targetY = target.getClientRect().y;
  const halfTargetY = target.getClientRect().height / 2;
  const targetX = target.getClientRect().x;
  const maxX = target.getClientRect().width;
  return [targetX + maxX, targetY + halfTargetY];
};

export const getImageArrowPointerPos = (target: Konva.Group): Array<number> => {
  const nodeX = target.x() - 24;
  const halfY = target.getClientRect().height / 2;
  return [nodeX, target.y() + halfY];
};

export const makArrow = (
  target: Konva.Group,
  pos: Konva.Vector2d,
  attributes: Item
) => {
  const { bgColor } = attributes;
  const points = [...getLetterArrowPointerPos(target), pos.x, pos.y];
  return arrowFactory(bgColor, points);
};

export const getImageNodes = (
  stage: Konva.Stage,
  excludedIds: Array<string>
): Array<Konva.Group> => {
  const filter = (item: any) => {
    const itemId = item.attrs["itemId"];
    const isNotFound =
      excludedIds.findIndex((excluded) => {
        return excluded === itemId;
      }) === -1;
    return item.attrs["role"] === "image" && isNotFound;
  };
  return stage.find("Group").toArray().filter(filter) as Array<Konva.Group>;
};
const changeColor = (group: Konva.Group) => {
  const textNode = group.findOne("Text") as Konva.Text;
  if (textNode) {
    textNode.fill("red");
  }
};
export function pointerInDimension(
  { x, y }: Konva.Vector2d,
  group: Konva.Group
): boolean {
  const minX = group.x() - 10;
  const isInx = x > minX;
  const minY = group.y();
  const maxY = minY + group.getClientRect().height;
  const inY = y > minY && y < maxY;
  const inDimension = inY && isInx;
  if (inDimension) {
    changeColor(group);
  }

  return inDimension;
}
export const attachLineToLayer = (line: Konva.Arrow, node: Konva.Group) => {
  if (line) {
    const newPoints = [
      line.points()[0],
      line.points()[1],
      ...getImageArrowPointerPos(node),
    ];
    line.points(newPoints);
  }
};

export const makeBackActions = (arrows: Array<ArrowNode>): Array<ArrowNode> => {
  if (arrows.length) {
    return arrows
      .map((item, index) => {
        const isLast = index === arrows.length - 1;
        if (isLast) {
          item.arrowNode.remove();
          return null;
        }
        return item;
      })
      .filter(Boolean) as Array<ArrowNode>;
  }
  return [];
};

export const findGroupByItemId = (
  stage: Konva.Stage,
  identifier: string
): Konva.Group => {
  const groups = stage.find("Group").toArray();
  return groups.find((item) => {
    return item.attrs["itemId"] === identifier;
  }) as Konva.Group;
};

export const findGroupByRole = (
  stage: Konva.Stage,
  role: "image" | "letter"
): Array<Konva.Group> => {
  return stage
    .find("Group")
    .toArray()
    .filter((item) => item.attrs["role"] === role) as Array<Konva.Group>;
};
export function extractAttrsFromNode<
  T extends NodeAttributes | ArrowAttributes
>(node: Konva.Arrow | Konva.Group): T {
  const base = node.attrs;
  if (node.attrs["data-content"]) {
    base["data-content"] =
      typeof node.attrs["data-content"] === "object"
        ? node.attrs["data-content"]
        : JSON.parse(node.attrs["data-content"]);
  }
  return base;
}


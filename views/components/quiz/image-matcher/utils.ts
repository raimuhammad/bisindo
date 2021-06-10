import Konva from "konva";
import { colors } from "./colors";
import { LetterBoxOpt, BoxItem, ArrowStateNode, ArrowState } from "./types";
import faker from "faker";
import { find, map } from "lodash";
import ImageSource from "@root/image-data.json";

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

export const makeArrow = (
  target: Konva.Group,
  pos: Konva.Vector2d,
  attributes: { bgColor: string }
) => {
  const { bgColor } = attributes;
  const points = [...getLetterArrowPointerPos(target), pos.x, pos.y];
  return arrowFactory(bgColor, points);
};

export function letteBoxCallback({ stage, setter, arrows }: LetterBoxOpt) {
  return (e: any) => {
    const target = e.currentTarget;
    const check = arrows.find(
      (item) => item.letterId === target.getAttr("data-id")
    );
    if (!check) {
      const pos = stage.getPointerPosition();
      if (pos) {
        const arrowAttributes = [
          { name: "from", value: target.getAttr("data-id") },
          { name: "color", value: target.getAttr("data-color") },
          { name: "to", value: "" },
        ];
        const arrow = makeArrow(target, pos, {
          bgColor: target.getAttr("data-color"),
        });
        arrowAttributes.forEach(({ name, value }) =>
          arrow.setAttr(`data-${name}`, value)
        );
        setter(arrow);
      }
    }
  };
}

const getColor = (current: Array<string>): string => {
  const random = faker.random.arrayElement(colors);
  const f = find(current, random);
  if (f) return getColor(current);
  return random;
};

function findImageSource(letter: string) {
  const find = ImageSource.find(
    (item) => item.letter.toUpperCase() === letter.toUpperCase()
  );
  return find ? "/letters/" + find.letter.toUpperCase() + "./png" : "";
}
const currents: Array<string> = [];
const alphabetItems: Array<any> = [];

for (const index in ImageSource) {
  const color = getColor(currents);
  currents.push(color);
  const letter = ImageSource[index].letter.toUpperCase();
  alphabetItems.push({
    letter,
    bgColor: color,
    image: "/letters" + ImageSource[index].letter.toLocaleLowerCase(),
  });
}

export const convertLetterToItem = (text: string) => {
  const letters = text.split("").map((item) => {
    const f = alphabetItems.find((a) => a.letter === item.toUpperCase());
    return {
      ...f,
      id: faker.unique(faker.datatype.uuid),
    };
  });
  return letters;
};

export function findImageNodes(
  stage: Konva.Stage,
  customCompare?: (group: Konva.Group) => boolean
) {
  const com = customCompare ? customCompare : () => true;
  return stage
    .find("Group")
    .toArray()
    .filter(
      (item) =>
        item.getAttr("data-type") === "IMAGE" && com(item as Konva.Group)
    ) as Array<Konva.Group>;
}
export function findTextNodes(
  stage: Konva.Stage,
  customCompare?: (group: Konva.Group) => boolean
) {
  const com = customCompare ? customCompare : () => true;
  return stage
    .find("Group")
    .toArray()
    .filter(
      (item) => item.getAttr("data-type") === "TEXT" && com(item as Konva.Group)
    ) as Array<Konva.Group>;
}
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
  return inDimension;
}
export const getImageArrowPointerPos = (target: Konva.Group): Array<number> => {
  const nodeX = target.x() - 24;
  const halfY = target.getClientRect().height / 2;
  return [nodeX, target.y() + halfY];
};

export const attachLineToImageGroup = (
  line: Konva.Arrow,
  node: Konva.Group
) => {
  if (line) {
    const newPoints = [
      line.points()[0],
      line.points()[1],
      ...getImageArrowPointerPos(node),
    ];
    line.points(newPoints);
  }
};

export const transformArrowStateToNode = (
  props: Omit<ArrowState, "arrowId">,
  stage: Konva.Stage
): Omit<ArrowStateNode, "arrow"> => {
  const compare = (key: "letterId" | "imageId") => (node: Konva.Group) =>
    node.getAttr("data-id") === props[key];

  const textNodes = findTextNodes(stage, compare("letterId"));
  const imageNodes = findImageNodes(stage, compare("imageId"));

  return {
    to: imageNodes[0],
    from: textNodes[0],
  };
};

export const getFromToArrowPos = ({
  to,
  from,
}: Omit<ArrowStateNode, "arrow">) => {
  return [...getLetterArrowPointerPos(from), ...getImageArrowPointerPos(to)];
};

export const attachArrow = ({ arrow, to, from }: ArrowStateNode) => {
  const pos = getFromToArrowPos({ to, from });
  arrow.points(pos);
};

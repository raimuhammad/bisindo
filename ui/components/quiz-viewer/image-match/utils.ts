import faker from "faker";
import { colors } from "@components/quiz-viewer/colors";
import { find } from "lodash";
import Konva from "konva";
import {
  ArrowNode,
  ImageNode,
} from "@components/quiz-viewer/image-match/types";

const getColor = (current: Array<string>): string => {
  const random = faker.random.arrayElement(colors);
  const f = find(current, random);
  if (f) return getColor(current);
  return random;
};
export const makeNodeInitial = (
  index: number,
  string: string,
  current: Array<string>
) => {
  return {
    id: `rect-${index}-node`,
    text: string,
    bg: getColor(current),
  };
};

export function makeImageRect({ stage, text }: any) {
  return (_: any, index: number) => {
    if (!stage) {
      return [0, 0];
    }
    const stageHeight = stage.width() - text.length;
    const dimension = stageHeight / text.length;
    let x = !index ? 0 : dimension * index;
    return {
      x,
      y: 0,
      width: dimension,
      height: dimension / 2,
    };
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
  const x = target.getClientRect().x;
  return [x + target.getClientRect().width / 2, target.height()];
};
export function pointerInDimension(
  { x, y }: Konva.Vector2d,
  group: Konva.Group
): boolean {
  const top = group.y();
  const right = group.x() + group.width();
  const left = group.x();
  const bottom = group.y() + group.width();
  const inX = x >= left && x <= right;
  const inY = y >= top && y <= bottom;
  return inX && inY;
}
export const makeArrow = (
  target: Konva.Group,
  pos: Konva.Vector2d,
  attributes: { bgColor: string }
) => {
  const { bgColor } = attributes;
  const points = [...getLetterArrowPointerPos(target), pos.x, pos.y];
  return arrowFactory(bgColor, points);
};

type OnDrawingHandlerProps = {
  index: number;
  nodes: ImageNode[];
  stage: Konva.Stage;
  layer: Konva.Layer;
};

const findGroup = (
  stage: Konva.Stage,
  role: "text" | "image" = "text"
): Konva.Group[] => {
  return stage
    ?.find(`Group`)
    .toArray()
    .filter((item) => {
      return item.getAttr("data-role") === role;
    }) as Konva.Group[];
};

type OnDrawingCallback = (e?: any) => {
  nodes: ImageNode[];
  arrow: null | ArrowNode;
};

export const onDrawing = ({
  index,
  stage,
  nodes,
  layer,
}: OnDrawingHandlerProps) => {
  return (event: any) => {
    const nodeStatus = nodes[index];
    const onExists: OnDrawingCallback = (e: any) => {
      return {
        nodes,
        arrow: null,
      };
    };
    if (nodeStatus.hasArrow) {
      return new Promise<ReturnType<OnDrawingCallback>>(resolve => {
        return resolve({
          nodes,
          arrow: null
        })
      })
    }
    const target = event.currentTarget as Konva.Group;
    const pointer = stage.getPointerPosition() as any;
    const node = nodes[index];
    const bgColor = node.bg;
    const arrow = makeArrow(event.target, pointer, { bgColor });
    arrow.setAttr("data-from", target.getAttr("data-letter"));
    const attachArrow = (arrow: Konva.Arrow, points: Array<number>) => {
      arrow.points(points);
      layer.batchDraw();
    };
    layer.add(arrow);
    return new Promise<ReturnType<OnDrawingCallback>>((resolve) => {
      stage.on("mouseup touchend", () => {
        const imageGroups = findGroup(stage, "image");
        const collideWith = imageGroups.find((item) => {
          return pointerInDimension(stage.getPointerPosition() as any, item);
        });
        let arrowNode: null | ArrowNode = null;
        if (collideWith) {
          const x = collideWith.x() + collideWith.width() / 2;
          const points = [
            arrow.points()[0],
            arrow.points()[1],
            x,
            collideWith.y(),
          ];
          arrowNode = {
            points: [
              arrow.points()[0],
              arrow.points()[1],
              collideWith.x() + collideWith.width() / 2,
              collideWith.y(),
            ],
            from: arrow.getAttr("data-from"),
            to: collideWith.getAttr("data-letter"),
            bg: arrow.stroke(),
            arrowIndex: index,
            fromId: target.getAttr("id"),
            toId: collideWith.getAttr("id"),
          };
          nodes[index].hasArrow = true;
        }
        resolve({
          arrow: arrowNode,
          nodes: nodes,
        });
        arrow.remove();
        layer.batchDraw();
        stage.off("mouseup touchend mousemove touchmove");
      });
      stage.on("mousemove touchmove", () => {
        const pos = stage.getPointerPosition();
        if (pos) {
          attachArrow(arrow, [
            arrow.points()[0],
            arrow.points()[1],
            pos.x,
            pos.y,
          ]);
        }
      });
    });
  };
};

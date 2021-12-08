import Konva from "konva";

const checkCollision = () => {};

const getSiblings = (target: Konva.Group, stage: Konva.Stage) => {
  return stage
    .find("Group")
    .toArray()
    .filter(
      (item) => item.getAttr("id") !== target.getAttr("id")
    ) as Konva.Group[];
};
function haveIntersection(r1: any, r2: any) {
  return !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  );
}

type MakeHandlerProps = {
  stage: Konva.Stage;
  target: number;
  swap(n: number, t: number): void;
  original: Record<"x" | "y", number>;
};

export function makeDragHandler({
  stage,
  target,
  swap,
  original,
}: MakeHandlerProps) {
  return (evt: Konva.KonvaEventObject<DragEvent>) => {
    const rect = evt.target as unknown as Konva.Group;
    const sibling = getSiblings(rect, stage);
    const collideWith = sibling.findIndex((item) => {
      return haveIntersection(rect.getClientRect(), item.getClientRect());
    });
    console.log(
      collideWith === -1
    )
    if (collideWith !== -1) {
      swap(target, collideWith);
    } else {
      console.log(
        "go original"
      )
      rect.setPosition({
        x: original.x,
        y: original.y,
      });
    }
  };
}

type MakeImageRectProps = {
  stage: Konva.Stage;
  text: string;
};

export function makeImageRect({ stage, text }: MakeImageRectProps) {
  return (_: any, index: number) => {
    if (!stage) {
      return [0, 0];
    }
    const stageHeight = stage.height();
    const dimension = (stage.height() / text.length);
    const halfStage = stageHeight / 2;
    const y = halfStage - dimension / 2;
    const stageWidth = stage.width();
    const totalWidth = (dimension + 30) * text.length;
    const startpoint = (stageWidth - totalWidth) / 2;
    return {
      x: index ? index * (dimension + 30) + startpoint : startpoint,
      y,
      width: dimension,
      height: dimension,
    };
  };
}

import Konva from "konva";
import { ArrowStateNode, CommonArgs } from "./types";
import {
  findImageNodes,
  pointerInDimension,
  attachLineToImageGroup,
  attachArrow,
} from "./utils";

export function drawlistener({ stage, layer }: CommonArgs) {
  return (arrow: Konva.Arrow) => {
    layer.add(arrow);
    layer.batchDraw();
    stage.on("mousemove touchmove", () => {
      const pos = stage.getPointerPosition();
      if (pos) {
        const points = [arrow.points()[0], arrow.points()[1], pos.x, pos.y];
        arrow.points(points);
        layer.batchDraw();
      }
    });
    return () => {
      stage.off("mousemove touchmove");
    };
  };
}

export function endDrawingListener({
  callback,
  stage,
  layer,
  arrow,
}: CommonArgs<{ callback(state: ArrowStateNode): void; arrow: Konva.Arrow }>) {
  stage.on("mouseup touchend", () => {
    const images = findImageNodes(stage);
    const target = images.find((item) => {
      return pointerInDimension(
        stage.getPointerPosition() as Konva.Vector2d,
        item
      );
    });
    if (!target) {
      arrow.remove();
    }
    if (target) {
      const from = stage
        .find("Group")
        .toArray()
        .find((item) => {
          return item.getAttr("data-id") === arrow.getAttr("data-from");
        }) as undefined | Konva.Group;
      if (from) {
        const arg = {
          arrow,
          to: target,
          from,
        };
        attachArrow(arg);
        arrow.fill(target.getAttr("data-color"));
        callback(arg);
      }
    }
    arrow.remove();
    layer.batchDraw();
  });
  return () => {
    stage.off("mouseup touchend");
  };
}

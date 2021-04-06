import { ImageQuiz, WithQuestion } from "./types";
import { shuffle } from "lodash";
import Konva from "konva";
import { useCallback, useEffect } from "react";

export function makeQuestions(inputs: Array<ImageQuiz>): Array<WithQuestion> {
  const letters: Array<string> = shuffle(inputs.map(({ letter }) => letter));
  return inputs.map((item, index) => ({
    ...item,
    questionLetter: letters[index],
  }));
}

type UseOnLetterProps = {
  stage: null | Konva.Stage;
  lineSetter(arrow: Konva.Arrow): void;
  onPainting(v: boolean): void;
};
export function useOnLetterClick({
  stage,
  lineSetter,
  onPainting,
}: UseOnLetterProps) {
  const callback = useCallback(
    (e) => {
      const target: Konva.Group = e.currentTarget;
      if (stage) {
        const arrows = (stage.find("Arrow") as unknown) as Array<Konva.Group>;
        const find = Array.from(arrows).find((item) => {
          return item.attrs["data-from"] === target.attrs.id;
        });
        if (!find) {
          onPainting(true);
          const pos = stage.getPointerPosition();
          if (pos) {
            const lastLine = new Konva.Arrow({
              stroke: "#000000",
              strokeWidth: 5,
              globalCompositeOperation: "source-over",
              points: [
                target.getClientRect().width + 10,
                target.y() + 50,
                pos.x,
                pos.y,
              ],
            });
            const layer = stage.getLayers();
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            layer[0].add(lastLine);
            lineSetter(lastLine);
            lastLine.setAttr("data-from", target.attrs["id"]);
          }
        }
      }
    },
    [stage, lineSetter]
  );
  return callback;
}

type UseArroeListenerProps = {
  stage: Konva.Stage | null;
  line: Konva.Arrow | null;
  isPainting: boolean;
  onAttached(): void;
  onReset(): void;
};

const snapDistance = 100;
function distance(p: any, c: any) {
  const dx = p.x - c.getX();
  const dy = p.y - c.getY();
  return Math.sqrt(dx * dx + dy * dy);
}
export function useArrowListener({
  stage,
  line,
  isPainting,
  onAttached,
  onReset,
}: UseArroeListenerProps) {
  useEffect(() => {
    if (stage) {
      stage.on("mouseup touchend", onReset);
      stage.on("mousemove touchmove", () => {
        if (!isPainting || !line) {
          return null;
        }
        const pos = stage.getPointerPosition();
        if (pos) {
          const points = [line.points()[0], line.points()[1], pos.x, pos.y];
          line.points(points);
          const layers = (stage.getLayers() as unknown) as Array<Konva.Layer>;
          const layer = layers[0];
          layer.batchDraw();
          const childs = (layer.find("Group") as unknown) as Array<Konva.Group>;
          const images = childs.filter((item: any) => {
            return (
              item.attrs.className === "images" && !item.attrs["has-selected"]
            );
          });
          images.forEach((node: Konva.Group) => {
            if (distance(pos, node) <= snapDistance) {
              const newPoints = [
                line.points()[0],
                line.points()[1],
                node.x(),
                node.y() + 50,
              ];
              line.points(newPoints);
              line.setAttr("data-to", node.attrs.id);
              node.setAttr("has-selected", "true");
              onAttached();
              layer.batchDraw();
            }
          });
        }
      });
      return () => {
        stage.off("mousemove touchmove");
        stage.off("mouseup touchend");
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [stage, line, isPainting, onAttached]);
}

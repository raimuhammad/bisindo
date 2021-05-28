import * as React from "react";
import Konva from "konva";
import { useContext, useEffect, useState } from "react";
import { useKonva } from "@providers/konva/konva-provider";
import { convertLetterToItem, letteBoxCallback } from "./utils";
import { drawlistener, endDrawingListener } from "./listeners";
import { ArrowState, ArrowStateNode, BoxItem } from "./types";
interface IMatchProvider {
  letterHandler(e: any): void;
  /**
   * Variables
   */
  text: string;
  items: BoxItem[];
  arrows: ArrowState[];
}
const Context = React.createContext<null | IMatchProvider>(null);

export function useStore() {
  return useContext(Context) as IMatchProvider;
}

type Props = {
  text: string;
};

const useArrowList = () => {
  const [arrows, setArrows] = useState<ArrowState[]>([]);
  const [latest, setLatest] = useState<null | ArrowState>(null);
  const addArrow = ({ from, to }: ArrowStateNode) => {
    const check = arrows.find((item) => item.imageId === to.getAttr("data-id"));
    if (!check) {
      const item: ArrowState = {
        arrowId: `${to.getAttr("data-id")}|${from.getAttr("data-id")}`,
        imageId: to.getAttr("data-id"),
        letterId: from.getAttr("data-id"),
      };
      setLatest(item);
      setArrows([...arrows, item]);
    }
  };
  const reset = () => setArrows([]);
  return {
    addArrow,
    arrows,
    reset,
  };
};

export const ImageMatchProvider = ({
  children,
  text,
}: React.PropsWithChildren<Props>) => {
  const konva = useKonva();
  const [drawingLine, setDrawingLine] = useState<null | Konva.Arrow>(null);
  const [items, setItems] = useState<Array<BoxItem>>([]);
  const { addArrow, arrows, reset } = useArrowList();
  const drawEvt = drawlistener(konva);

  useEffect(() => {
    setItems(convertLetterToItem(text.trim()));
    reset();
  }, [text]);

  const letterHandler = letteBoxCallback({
    ...konva,
    setter: setDrawingLine,
    arrows,
  });

  const ctx: IMatchProvider = {
    letterHandler,
    text,
    items,
    arrows,
  };

  useEffect(() => {
    const unsub = !drawingLine
      ? null
      : endDrawingListener({
          callback: (args) => {
            setDrawingLine(null);
            addArrow(args);
          },
          arrow: drawingLine,
          ...konva,
        });
    return () => {
      unsub && unsub();
    };
  }, [drawingLine, items]);

  useEffect(() => {
    const unsub = drawingLine ? drawEvt(drawingLine) : null;
    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [drawingLine, items]);

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
};

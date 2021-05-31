import * as React from "react";
import Konva from "konva";
import { useContext, useEffect, useState } from "react";
import { useKonva } from "@providers/konva/konva-provider";
import { convertLetterToItem, letteBoxCallback } from "./utils";
import { drawlistener, endDrawingListener } from "./listeners";
import { ArrowState, ArrowStateNode, BoxItem, ListenerArgs } from "./types";
import { shuffle } from "lodash";

interface IMatchProvider {
  letterHandler(e: any): void;
  /**
   * Variables
   */
  text: string;
  items: BoxItem[];
  shufledItems: BoxItem[];
  arrows: ArrowState[];
}
const Context = React.createContext<null | IMatchProvider>(null);

export function useStore() {
  return useContext(Context) as IMatchProvider;
}

type Props = {
  text: string;
  showHint: boolean;
  listener?(args: ListenerArgs): void;
  answers: Array<ArrowState>;
};

const useArrowList = (
  items: BoxItem[],
  listener?: (arg: ListenerArgs) => void
) => {
  const [arrows, setArrows] = useState<ArrowState[]>([]);
  const [latest, setLatest] = useState<null | ArrowState>(null);
  const parse = ({ from, to }: Omit<ArrowStateNode, "arrow">): ArrowState => {
    return {
      arrowId: `${to.getAttr("data-id")}|${from.getAttr("data-id")}`,
      imageId: to.getAttr("data-id"),
      letterId: from.getAttr("data-id"),
      fromLetter: from.getAttr("data-letter"),
      targetLetter: to.getAttr("data-letter"),
    };
  };

  const addArrow = ({ from, to }: ArrowStateNode) => {
    const check = arrows.find((item) => item.imageId === to.getAttr("data-id"));
    if (!check) {
      const item: ArrowState = parse({ from, to });
      setLatest(item);
      setArrows([...arrows, item]);
      if (listener) {
        listener({ items, arrow: item });
      }
    }
  };
  const addArrows = (items: ArrowStateNode[]) => {
    const parsed = items.map(parse);
    setArrows([...parsed]);
  };
  const reset = () => setArrows([]);
  return {
    addArrow,
    arrows,
    reset,
    addArrows,
    setArrows,
  };
};

export const ImageMatchProvider = ({
  children,
  text,
  showHint,
  listener,
  answers,
}: React.PropsWithChildren<Props>) => {
  const konva = useKonva();
  const [drawingLine, setDrawingLine] = useState<null | Konva.Arrow>(null);
  const [items, setItems] = useState<Array<BoxItem>>([]);
  const [shufledItems, setShufledItems] = useState<Array<BoxItem>>([]);
  const { addArrows, addArrow, arrows, reset, setArrows } = useArrowList(
    items,
    listener
  );
  const drawEvt = drawlistener(konva);

  useEffect(() => {
    if (showHint) {
      const toArrows = items
        .map((item): ArrowStateNode | null => {
          const from = konva.stage
            .find(`Group`)
            .toArray()
            .find((i) => {
              return i.getAttr("data-id") === `${item.id}-text-text`;
            }) as Konva.Group;
          const target = konva.stage
            .find(`Group`)
            .toArray()
            .find((i) => {
              return i.getAttr("data-id") === `${item.id}-image-image`;
            }) as Konva.Group;
          if (target && from) {
            return {
              to: target,
              from: from,
              arrow: new Konva.Arrow(),
            };
          }
          return null;
        })
        .filter(Boolean);
      addArrows(toArrows as ArrowStateNode[]);
    } else {
      if (answers.length) {
        setArrows(answers);
      } else {
        reset();
      }
    }
  }, [showHint, answers]);

  useEffect(() => {
    const parsed = convertLetterToItem(text.trim());
    setItems(parsed);
    setShufledItems(shuffle(parsed));
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
    shufledItems,
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

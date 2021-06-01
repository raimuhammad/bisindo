/* eslint-disable */
import * as React from "react";
import { ItemState, ILetterCheck } from "./type";
import { parse } from "./utils";
import { createContext, useContext } from "react";
import { sortBy } from "lodash";

interface ILetterSequence {
  items: ItemState[];
  readOnly: boolean;
  showHint: boolean;
  updatePos(t: ItemState, c: ItemState): void;
  useImage: boolean;
}
const Context = createContext<null | ILetterSequence>(null);

type Props = {
  text: string;
  readOnly: boolean;
  showHint: boolean;
  letterCheckRef?: React.MutableRefObject<ILetterCheck | undefined>;
  useImage: boolean;
};

function useLetterCheck(items: ItemState[]): ILetterCheck {
  const originalArr = sortBy(items, "originalIndex");
  const answerArr = sortBy(items, "currentIndex");
  // @ts-ignore
  const originalText = originalArr.map((item) => item.letter).join();
  // @ts-ignore
  const answerText = answerArr.map((item) => item.letter).join();
  return {
    answerArr,
    questionArr: originalArr,
    isCorrect: originalText === answerText,
  };
}

export function useStore() {
  return useContext(Context) as ILetterSequence;
}

export const Provider = ({
  text,
  children,
  showHint,
  readOnly,
  letterCheckRef,
  useImage,
}: React.PropsWithChildren<Props>) => {
  const [items, setItems] = React.useState<ItemState[]>([]);

  const letterCheck = useLetterCheck(items);

  React.useEffect(() => {
    if (letterCheckRef) letterCheckRef.current = letterCheck;
  }, [letterCheck]);

  const updatePos = (target: ItemState, collusion: ItemState) => {
    const tIndex = items.findIndex((item) => item.id === target.id);
    const cIndex = items.findIndex((item) => item.id === collusion.id);
    const arr = items;
    arr[tIndex].currentIndex = collusion.currentIndex;
    arr[cIndex].currentIndex = target.currentIndex;
    setItems([...arr]);
  };

  React.useEffect(() => {
    const parsed = parse(text, showHint);
    setItems(parsed);
  }, [text]);

  const getItems = () => {
    if (showHint) {
      return items.map((item, index) => ({
        ...item,
        currentIndex: index,
      }));
    }
    return items;
  };
  const context: ILetterSequence = {
    items: getItems(),
    updatePos,
    readOnly,
    showHint,
    useImage,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

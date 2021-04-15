import * as React from "react";
import Konva from "konva";
import { calcPos } from "./utilities";
import Data from "root/image-data.json";
import { useKonva } from "providers/konva/konva-provider";
import { ILetterItem } from "./types";
import { shuffle } from "lodash";

type Props = {
  text: string;
  stage: Konva.Stage;
  layer: Konva.Layer;
};

type State = {
  active: {
    letterItem: ILetterItem;
    node: Konva.Group;
  } | null;
  items: ILetterItem[];
};

type HandlerCreateator = (
  arg: ILetterItem
) => {
  onDragEnd(): void;
  onDragStart(e: any): void;
};

type ILetterPuzzle = {
  items: ILetterItem[];
  createHandler: HandlerCreateator;
  getPos(args: ILetterItem): ReturnType<typeof calcPos>;
  question: string;
};

const Context = React.createContext<null | ILetterPuzzle>(null);

export function useLetterItem(): ILetterPuzzle {
  return React.useContext(Context) as ILetterPuzzle;
}
const findSrcByLetter = (letter: string): string => {
  const check = Data.find(
    (item) => item.letter.toLocaleLowerCase() === letter.toLocaleLowerCase()
  );
  if (check) return check.image;
  return "";
};
type IRect = Record<"width" | "height" | "x" | "y", number>;

export function haveIntersection(r1: IRect, r2: IRect) {
  return !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  );
}

const animateGroup = (group: Konva.Group, newPos: IRect) => {
  group.to({
    ...newPos,
    duration: 0.3,
  });
};

export class Provider extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    const items: Array<ILetterItem> = shuffle(this.props.text.split("")).map(
      (item: string, index): ILetterItem => {
        const check = findSrcByLetter(item);
        return {
          letter: item,
          id: `letter-${item}-${index}`,
          itemIndex: index,
          src: check,
        };
      }
    );
    this.state = {
      items,
      active: null,
    };
  }
  getPos = (arg: ILetterItem) => {
    const { items } = this.state;
    const { stage } = this.props;
    return calcPos({
      stage,
      itemLen: items.length,
      itemIndex: arg.itemIndex,
      spacing: 28,
    });
  };
  onDragEnd = () => {
    if (this.state.active) {
      this.state.active.node.setZIndex(1);
    }
    this.setState({
      active: null,
    });
  };

  updateArray = (node: ILetterItem, toSwap: ILetterItem) => {
    const map = this.state.items.map((item) => {
      if (node.id === item.id) {
        return {
          ...node,
          itemIndex: toSwap.itemIndex,
        };
      }
      if (toSwap.id === item.id) {
        return {
          ...toSwap,
          itemIndex: node.itemIndex,
        };
      }
      return item;
    });
    this.setState({
      items: [...map],
    });
  };

  createHandler: HandlerCreateator = (letterItem: ILetterItem) => {
    const onDragStart = (e: any) => {
      const node = e.currentTarget as Konva.Group;
      node.setZIndex(this.state.items.length - 1);
      this.setState({
        active: { node, letterItem },
      });
    };
    return {
      onDragEnd: this.onDragEnd,
      onDragStart,
    };
  };
  onStageDraggin = () => {
    const { active } = this.state;
    if (active) {
      const originalPos = this.getPos(active.letterItem);
      let shouldGoBack = true;
      const intersectionSibling = this.getSiblings(active.node).find(
        (sibling) => {
          return haveIntersection(
            sibling.getClientRect(),
            active.node.getClientRect()
          );
        }
      );
      if (intersectionSibling) {
        shouldGoBack = false;
        const siblingAttr = JSON.parse(intersectionSibling.attrs["content"]);
        const swapPos = this.getPos(siblingAttr);
        const siblingNewPos = this.getPos(active.letterItem);
        animateGroup(active.node, swapPos);
        animateGroup(intersectionSibling, siblingNewPos);
        setTimeout(() => {
          this.updateArray(active.letterItem, siblingAttr);
        }, 300);
      }
      shouldGoBack &&
        active.node.to({
          ...originalPos,
          duration: 0.3,
        });
      setTimeout(() => {
        this.onDragEnd();
      }, 300);
    }
  };

  getValues = (): ILetterPuzzle => ({
    items: this.state.items,
    createHandler: this.createHandler,
    getPos: this.getPos,
    question: this.props.text,
  });

  render() {
    return (
      <Context.Provider value={this.getValues()}>
        {this.props.children}
      </Context.Provider>
    );
  }
  componentDidMount() {
    this.props.stage.on("mouseup", this.onStageDraggin);
  }
  componentWillUnmount() {
    this.props.stage.off("mouseup");
  }

  getSiblings = (current: Konva.Group) =>
    this.props.stage
      .find("Group")
      .toArray()
      .filter(
        (item) => item.attrs["itemId"] !== current.attrs["itemId"]
      ) as Konva.Group[];
}

export const LetterPuzzleProvider = ({
  text,
  children,
}: React.PropsWithChildren<{ text: string }>) => {
  const konva = useKonva();
  return (
    <Provider text={text} {...konva}>
      {children}
    </Provider>
  );
};

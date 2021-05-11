import Konva from "konva";
import { makeAutoObservable, toJS } from "mobx";
import { LetterPuzzleItem } from "./letter-puzzle-item";
import Data from "root/image-data.json";
import { calcPos } from "./utility";
import { shuffle } from "lodash";

const findSrcByLetter = (letter: string): string => {
  const check = Data.find(
    (item) => item.letter.toLocaleLowerCase() === letter.toLocaleLowerCase()
  );
  if (check) return check.image;
  return "";
};

type LetterPuzzleConstructor = {
  stage: Konva.Stage;
  letter: string;
  spacing: number;
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

type Active = {
  item: LetterPuzzleItem;
  originalPos: IRect;
  target: Konva.Group;
};

export class LetterPuzzle {
  static calcPos = calcPos;
  letter: string;
  items: LetterPuzzleItem[];
  active: Active | null = null;
  stage: Konva.Stage;
  minX = 0;
  spacing = 0;

  constructor({ letter, stage }: LetterPuzzleConstructor) {
    this.stage = stage;
    this.letter = letter;
    const wordArray = shuffle(letter.split(""));
    this.items = wordArray.map((item, index) => {
      const check = findSrcByLetter(item);
      return new LetterPuzzleItem({
        letter: item,
        id: `letter-${item}-${index}`,
        itemIndex: index,
        stage,
        src: check,
        siblingLength: wordArray.length,
      });
    });
    makeAutoObservable(this);
    stage.on("mouseup", this.onStageDrag);
  }
  setActive = (args: Active | null) => {
    if (args) {
      args.target.setZIndex(this.items.length - 1);
    }
    this.active = args;
  };

  getHandler = (active: Omit<Active, "target">) => {
    return (e: any) => {
      const target = e.currentTarget as Konva.Group;
      return this.setActive({
        ...active,
        target,
      });
    };
  };

  onStageDrag = () => {
    if (this.active) {
      const { originalPos, item, target } = this.active;
      const { x, y } = originalPos;
      const siblings = this.items.filter((sib) => sib.id !== item.id);
      let backtoPos = true;
      const intersection = siblings.find((item) => {
        const node = item.groupNode;
        if (!node) return false;
        return haveIntersection(node.getClientRect(), target.getClientRect());
      });
      if (intersection) {
        const tmpItemIndex = item.itemIndex;
        const tmpSibIndex = intersection.itemIndex;
        item.updateItemIndex(tmpSibIndex);
        intersection.updateItemIndex(tmpItemIndex);
        backtoPos = false;
      }
      if (backtoPos) {
        target.to({
          x,
          y,
          duration: 0.3,
        });
        setTimeout(() => {
          this.setActive(null);
        }, 300);
      }
    }
  };

  answer = (): string => {
    return this.items.map((item) => item.letter).join("");
  };

  get letterNodes() {
    return this.stage
      .find("Group")
      .toArray()
      .filter((item) => item.attrs["role"] === "letter") as Array<Konva.Group>;
  }
}

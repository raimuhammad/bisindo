import Konva from "konva";
import { makeAutoObservable } from "mobx";
import { calcPos } from "./utility";

type LetterPuzzleItemConstructor = {
  letter: string;
  src: string;
  id: string;
  itemIndex: number;
  stage: Konva.Stage;
  siblingLength: number;
};
export class LetterPuzzleItem {
  letter: string;
  id: string;
  itemIndex: number;
  src: string;
  private stage: Konva.Stage;
  isActive = false;
  siblingLength: number;
  constructor({
    letter,
    id,
    itemIndex,
    stage,
    src,
    siblingLength,
  }: LetterPuzzleItemConstructor) {
    this.letter = letter;
    this.src = src;
    this.id = id;
    this.itemIndex = itemIndex;
    this.stage = stage;
    this.siblingLength = siblingLength;
    makeAutoObservable(this);
  }
  toggle = (v: boolean) => {
    this.isActive = v;
  };

  private animate = (newIndex: number, callback: () => void) => {
    const commonProps = {
      itemLen: this.siblingLength,
      spacing: 28,
      stage: this.stage,
    };
    const nextPos = calcPos({
      ...commonProps,
      itemIndex: newIndex,
    });
    const node = this.groupNode;
    if (node) {
      node.to({
        duration: 0.3,
        x: nextPos.x,
        y: nextPos.y,
      });
    }
    return setTimeout(callback, 300);
  };

  setIndex = (n: number) => {
    this.itemIndex = n;
  };

  updateItemIndex = (n: number) => {
    this.animate(n, () => {
      console.log(this.itemIndex, n);
      this.setIndex(n);
    });
  };

  get groupNode(): Konva.Group {
    const find = this.stage
      .find("Group")
      .toArray()
      .find((item) => item.attrs["itemId"] === this.id);
    return find as Konva.Group;
  }
}

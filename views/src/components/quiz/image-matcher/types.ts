import Konva from "konva";

export type ArrowNode = {
  from: string;
  to: string | null;
  arrowNode: Konva.Arrow;
};

export type Item = {
  id: string;
  letter: string;
  image: string;
  bgColor: string;
  textColor: string;
  question: Exclude<Item, "imageNode" | "textNode" | "lineNode" | "question">;
};

export type NodeAttributes = {
  itemId: string;
  itemLetter: string;
  "data-content": Item;
};
export type ArrowAttributes = {
  itemFrom: string;
  itemTo: string;
  itemQuestion: string;
  itemAnswer?: string;
};
export type ItemAnswer = {
  itemQuestion: string;
  itemAnswer?: string;
};

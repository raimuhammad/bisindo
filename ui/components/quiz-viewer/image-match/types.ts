export type ImageNode = {
  id: string;
  text: string;
  bg: string;
  x: number;
  y: number;
  height: number;
  width: number;
  hasArrow: boolean;
};
export type ArrowNode = {
  points: number[];
  from: string;
  to: string;
  bg: string;
  arrowIndex: number;
  fromId: string;
  toId: string;
};
export interface UseImageMatch {
  arrows: ArrowNode[];
  mouseHandler(index: number): (event: any) => void;
  popArrow(): void;
  nodes: ImageNode[]
  toggleHint(): void
}

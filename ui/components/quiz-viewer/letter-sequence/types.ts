export type LetterNode = {
  id: string;
  text: string;
  bg: string;
  x: number;
  y: number;
  height: number;
  width: number;
};
export interface UseLetterSequence {
  getNodeState(index: number): [LetterNode, (v: Partial<LetterNode>) => void];
  nodes: LetterNode[];
  text: string;
  swap(target: number, sibling: number): void;
  toggleHint(): void;
  toggleMode(): void;
  mode: "letter" | "image";
  showHint: boolean;
  enableDrag: boolean;
  toggleDrag(): void;
  onSubmit?(v: boolean): Promise<void>;
}

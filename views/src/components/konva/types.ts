export type NodeProps<T extends Record<string, any>> = {
  height: number;
  width: number;
  y: number;
  x: number;
} & T;

import Konva from "konva";

export type CommonArgs<T extends Record<string, any> = Record<string, any>> = {
  stage: Konva.Stage;
  layer: Konva.Layer;
} & T;

export type LetterBoxOpt = CommonArgs<{
  setter(arrow: Konva.Arrow): void;
  arrows: ArrowState[];
}>;
export type BoxItem = Record<"id" | "letter" | "bgColor" | "image", string>;

export type ArrowState = {
  arrowId: string;
  letterId: string;
  imageId: string;
};

export type ArrowStateNode = {
  arrow: Konva.Arrow;
} & Record<"from" | "to", Konva.Group>;

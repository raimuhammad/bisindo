import { useKonva } from "providers/konva/konva-provider";

type Options = {
  height: number;
  width: number;
};

const calc = (target: number, percent: number) => {
  return (target / 100) * percent;
};

export function useKonvaResponsive(size: number | Options, boxMode = false) {
  const { height, width }: Options =
    typeof size === "number"
      ? {
          height: size,
          width: size,
        }
      : size;
  const { stageDimension } = useKonva();
  const key: "height" | "width" = boxMode ? "height" : "width";
  return {
    height: calc(stageDimension.height, height),
    width: calc(stageDimension[key], boxMode ? height : width),
  };
}
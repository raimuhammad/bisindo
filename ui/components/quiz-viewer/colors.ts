/* eslint-disable */
import inverseColor from "invert-color";
import { sample } from "lodash";
import colorDatabase from "@egoist/md-colors";

function revertColor(color: string): string {
  try {
    return inverseColor(color);
  } catch (e) {
    return revertColor(color);
  }
}
const colorList: Array<string> = [];
const getColors = (): Record<"textColor" | "bgColor", string> => {
  const bgColor = sample(colorList) as string;
  try {
    return {
      bgColor,
      textColor: revertColor(bgColor),
    };
  } catch (e) {
    return getColors();
  }
};

Object.keys(colorDatabase).forEach((colorKey) => {
  if (colorKey !== "transparent") {
    // @ts-ignore
    Object.keys(colorDatabase[colorKey]).forEach((key) => {
      // @ts-ignore
      colorList.push(colorDatabase[colorKey][key]);
    });
  }
});

export const colors = colorList;

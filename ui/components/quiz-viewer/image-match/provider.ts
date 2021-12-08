import { UseImageMatch } from "./types";
import { createContext, useContext } from "react";

export const ImageMatchContext = createContext<null | UseImageMatch>(null);
export function useImageMatch() {
  return useContext(ImageMatchContext) as UseImageMatch;
}

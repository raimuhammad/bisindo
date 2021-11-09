import { createContext, useContext } from "react";
import type { IApp } from "./types";

export const AppContext = createContext<null | IApp>(null);

export function useApp() {
  return useContext(AppContext) as IApp;
}

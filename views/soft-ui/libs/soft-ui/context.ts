import { Actions, initialState, SoftUiState } from "./reducer";
import { createContext, useContext } from "react";

export type ActionCallBack = (v: Actions) => void;

export type AppMeta = {
  appName: string;
  appLogo?: string;
  user?: null | AppUser;
};

export type Props = AppMeta & {
  uiType: "dashboard" | "normal";
  routes: RouteDefinition[];
  getCurrentRoute(route: RouteDefinition): boolean;
  authFunctions?(): Promise<SoftUiState["status"]>;
};

type ISoftUi0 = typeof initialState &
  AppMeta & {
    customPageCallback(v: string): () => void;
  };

export type ISoftUi = [ISoftUi0, ActionCallBack];

export const Context = createContext<null | ISoftUi>(null);

export function useSoftUi() {
  return useContext(Context) as ISoftUi;
}

export const useSoftUIController = useSoftUi;

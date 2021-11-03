import { useReducer } from "react";

export enum SoftUiActions {
  MINI_SIDENAV = "MINI_SIDENAV",
  TRANSPARENT_SIDENAV = "TRANSPARENT_SIDENAV",
  SIDENAV_COLOR = "SIDENAV_COLOR",
  TRANSPARENT_NAVBAR = "TRANSPARENT_NAVBAR",
  FIXED_NAVBAR = "FIXED_NAVBAR",
  OPEN_CONFIGURATOR = "OPEN_CONFIGURATOR",
  DIRECTION = "DIRECTION",
  LAYOUT = "LAYOUT",
  USER = "USER",
  STATUS = "STATUS",
  CUSTOM_TITLE = "CUSTOM_TITLE",
}

export type SoftUiActionList = keyof typeof SoftUiActions;

export type Actions = {
  type: SoftUiActionList;
  value: any;
};

export type SoftUiState = {
  miniSidenav: boolean;
  transparentSidenav: boolean;
  sidenavColor: string;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
  direction: "ltr";
  layout: "dashboard" | "normal";
  user: AppUser | null;
  status: "init" | "loading" | "ready";
  customTitle: string;
};

export const initialState: SoftUiState = {
  miniSidenav: false,
  transparentSidenav: true,
  sidenavColor: "info",
  transparentNavbar: true,
  fixedNavbar: true,
  openConfigurator: false,
  direction: "ltr",
  layout: "dashboard",
  user: null,
  status: "init",
  customTitle: "",
};

const keyMap: Record<SoftUiActions, keyof typeof initialState> = {
  MINI_SIDENAV: "miniSidenav",
  TRANSPARENT_SIDENAV: "transparentSidenav",
  SIDENAV_COLOR: "sidenavColor",
  TRANSPARENT_NAVBAR: "transparentNavbar",
  FIXED_NAVBAR: "fixedNavbar",
  OPEN_CONFIGURATOR: "openConfigurator",
  DIRECTION: "direction",
  LAYOUT: "layout",
  USER: "user",
  STATUS: "status",
  CUSTOM_TITLE: "customTitle",
};

export function reducer(
  state: typeof initialState,
  action: Actions
): typeof initialState {
  const key = keyMap[action.type];
  return { ...state, [key]: action.value };
}

export const useSoftUiReducer = () => {
  return useReducer(reducer, initialState);
};

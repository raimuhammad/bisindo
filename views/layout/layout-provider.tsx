import * as React from "react";
import { useNodeDimension } from "@hooks/use-node-dimension";

interface ILayoutProvider {
  appBarHeight: number;
  appBarRef: React.MutableRefObject<HTMLDivElement>;
  getContentHeight(node: HTMLElement | number): number;
}

const Context = React.createContext<ILayoutProvider | null>(null);

export function useLayout(): ILayoutProvider {
  return React.useContext(Context) as ILayoutProvider;
}

export const LayoutProvider = ({ children }: any) => {
  const {
    nodeRef,
    dimension: { height },
  } = useNodeDimension();
  const baseHeight = window.innerHeight - height;
  const getContentHeight: ILayoutProvider["getContentHeight"] = (
    target = 0
  ) => {
    const n =
      typeof target === "number"
        ? target
        : target.getBoundingClientRect().height;
    return baseHeight - n;
  };
  const ctx: ILayoutProvider = {
    getContentHeight,
    appBarHeight: height,
    appBarRef: nodeRef as React.MutableRefObject<HTMLDivElement>,
  };
  return <Context.Provider value={ctx}>{children}</Context.Provider>;
};

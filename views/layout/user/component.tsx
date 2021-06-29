import * as React from "react";
import { LayoutProvider, useLayout } from "../layout-provider";
import { UserBar } from "./user-bar";
import { StudentAppProvider } from "@providers/student-app-provider";
import { Context } from "./context";

const Child = ({ children }: any) => {
  const layout = useLayout();
  const { getContentHeight, appBarHeight } = layout;
  const pageHeight = !appBarHeight ? 0 : getContentHeight(0);
  return (
    <Context.Provider value={{ ...layout, pageHeight }}>
      <UserBar />
      <>{children}</>
    </Context.Provider>
  );
};

const Comp = ({ children }: any) => {
  return (
    <StudentAppProvider>
      <LayoutProvider>
        <Child>{children}</Child>
      </LayoutProvider>
    </StudentAppProvider>
  );
};
export const Component = Comp;

import * as React from "react";
import { Box, Container, Grid, useTheme } from "@material-ui/core";
import { ProviderWrapper } from "@utils/provider-wrapper";
import { LayoutProvider, useLayout } from "../layout-provider";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { Navigator } from "./navigator";
import { UserBar } from "./user-bar";
import { Header } from "./header";
import { StudentAppProvider } from "@providers/student-app-provider";
import { Context } from "./context";

const Child = ({ children }: any) => {
  const layout = useLayout();
  const { appBarRef, getContentHeight, appBarHeight } = layout;
  const pageHeight = !appBarHeight ? 0 : getContentHeight(0);
  const theme = useTheme();
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

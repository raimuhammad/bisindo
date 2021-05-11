import * as React from "react";
import { useClasses } from "./styles";
import {
  createMuiTheme,
  ThemeProvider,
  ThemeOptions,
  Grid,
  Box,
} from "@material-ui/core";
import themeOptions from "./theme.json";
import { Header } from "./header";
import { observer } from "mobx-react";
import { layoutStore } from "./layout.store";
import { SidebarContainer as Sidebar } from "./sidebar/sidebar-container";
import { useApp } from "providers/app-provider";

const theme = createMuiTheme((themeOptions as unknown) as ThemeOptions);

// eslint-disable-next-line react/display-name
export const Theme = (Component: React.FC<any>) => (props: any) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...props} />
    </ThemeProvider>
  );
};

const Wrap = observer(({ children }: React.PropsWithChildren<any>) => {
  const classes = useClasses();
  const app = useApp();

  const openSideBar = () => {
    if (!app.user) return false;
    return true;
  };

  return (
    <div className={classes.root}>
      <Header />
      <div style={{ height: layoutStore.appbarHeight }} />
      <div
        ref={layoutStore.updatePageHeight}
        className={classes.contanerContainer}
      >
        {openSideBar() ? (
          <div aria-hidden={!layoutStore.sideBarOpen}>
            <Sidebar />
          </div>
        ) : null}
        <div
          style={{ height: layoutStore.pageHeight - layoutStore.appbarHeight }}
          className={classes.content}
        >
          {children}
        </div>
      </div>
    </div>
  );
});

export const Layout = Theme(Wrap);

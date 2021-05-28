import React from "react";
import clsx from "clsx";
import { Drawer, CssBaseline } from "@material-ui/core";
import { useStyles } from "./style";
import { routes } from "@admin-routes";
import { orderBy } from "lodash";
import { Navigator } from "./navigator";
import { useToggle } from "@hooks/use-toggle";
import { Header } from "./header";
import { LayoutProvider } from "../layout-provider";

const baseRoutes: typeof routes = orderBy(
  routes.filter((item) => Boolean(item.icon)),
  ["order"]
);

export const AdminLayout = ({ children }: any) => {
  const classes = useStyles();
  const [open, { toggle }] = useToggle();
  return (
    <LayoutProvider>
      <div className={classes.root}>
        <CssBaseline />
        <Header toggle={toggle} open={open} />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          PaperProps={{ elevation: 2 }}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <Navigator routes={baseRoutes} />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </LayoutProvider>
  );
};

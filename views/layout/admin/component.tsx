import React from "react";
import clsx from "clsx";
import { Drawer, CssBaseline } from "@mui/material";
import { useStyles } from "./style";
import { routes } from "@admin-routes";
import { orderBy } from "lodash";
import { Navigator } from "./navigator";
import { useToggle } from "@hooks/use-toggle";
import { Header } from "./header";
import { LayoutProvider } from "../layout-provider";
import { SoftUiProvider } from "../../soft-ui/libs/soft-ui";

const baseRoutes: typeof routes = orderBy(
  routes.filter((item) => Boolean(item.icon)),
  ["order"]
);

export const AdminLayout = ({ children }: any) => {
  return (
    <LayoutProvider>
      {children}
    </LayoutProvider>
  );
};

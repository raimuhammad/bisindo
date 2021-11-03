import { createElement } from "react";
import { Route } from "./type";
import { Home, Lock } from "@mui/icons-material";
import * as pages from "@guest-page";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: pages.Home,
    icon: createElement(Home),
    title: "",
    order: 0,
  },
  {
    path: "/sign-in",
    component: pages.Login,
    icon: createElement(Lock),
    title: "Login",
    order: 1,
  },
  {
    path: "/invitation/:invitation",
    component: pages.Invitation,
    icon: createElement(Lock),
    title: "Login",
    order: 1,
  },
].map(
  (item): RouteDefinition =>
    (({
      ...item,
      route: item.path,
      noCollapse: true,
      key: item.path,
      type: "",
      name: item.title,
    } as unknown) as RouteDefinition)
);

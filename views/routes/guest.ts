import { createElement } from "react";
import { Route } from "./type";
import { Home, Lock } from "@material-ui/icons";
import * as pages from "@guest-page";

export const routes: Route[] = [
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
];

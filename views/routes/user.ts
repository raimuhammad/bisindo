import * as pages from "@student-page";
import { DefaultComponent } from "./default-component";
import { createElement } from "react";
import { Class, Home } from "@mui/icons-material";

export const routes: RouteDefinition[] = [
  {
    path: "/dashboard",
    component: pages.Dashboard,
    icon: createElement(Home),
    title: "Dashboard",
    order: 0,
  },
  {
    path: "/account-setting",
    component: pages.AccountPage,
    title: "Pengaturan akun",
    order: 1,
  },
  {
    path: "/study",
    component: pages.StudyPage,
    icon: createElement(Class),
    title: "Belajar",
    order: 2,
  },
  {
    path: "/study/:videoId",
    component: pages.StudyShowPage,
    icon: createElement(Class),
    title: "",
    order: 3,
  },
  {
    path: "/profile",
    component: DefaultComponent,
    icon: createElement(Class),
    title: "",
    order: 3,
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

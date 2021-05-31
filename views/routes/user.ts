import * as pages from "@student-page";
import { Route } from "@root/routes/type";
import { DefaultComponent } from "@root/routes/default-component";
import { createElement } from "react";
import { Class, Home } from "@material-ui/icons";

export const routes: Route[] = [
  {
    path: "/",
    component: DefaultComponent,
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
];

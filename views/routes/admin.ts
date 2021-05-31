import { createElement } from "react";
import { DefaultComponent } from "./default-component";
import { Route } from "./type";
import { Class, Home, VideoLibrary, People } from "@material-ui/icons";
import * as pages from "@pages/admin";

export const routes: Route[] = [
  {
    path: "/",
    component: DefaultComponent,
    icon: createElement(Home),
    title: "Dashboard",
    order: 0,
  },
  {
    path: "/batch/:id",
    component: pages.BatchShow,
    title: "Batch",
    order: 2,
  },
  {
    path: "/batch",
    component: pages.BatchPage,
    icon: createElement(Class),
    title: "Batch",
    order: 1,
  },
  {
    path: "/quiz/:id/check",
    component: DefaultComponent,
    title: "Quiz",
    order: 3,
  },
  {
    path: "/video/:id/quiz",
    component: DefaultComponent,
    title: "Quiz",
    order: 4,
  },
  {
    path: "/quiz/:videoId",
    component: pages.QuizPaginator,
    title: "Quiz",
    order: 5,
  },
  {
    path: "/video",
    component: pages.VideoListPage,
    icon: createElement(VideoLibrary),
    title: "Konten",
    order: 6,
  },
  {
    path: "/student",
    component: pages.StudentListPage,
    icon: createElement(People),
    title: "Siswa",
    order: 7,
  },
];

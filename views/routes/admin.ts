import { createElement } from "react";
import { DefaultComponent } from "./default-component";
import { Route } from "./type";
import { Class, Home, VideoLibrary, People } from "@mui/icons-material";
import * as pages from "@pages/admin";

export const routes: RouteDefinition[] = [
  {
    path: "/batch/:id",
    component: pages.BatchShow,
    title: "Batch",
    order: 2,
    hideInMenu: true,
  },
  {
    path: "/batch",
    component: pages.BatchPage,
    icon: createElement(Class),
    title: "Batch",
    order: 1,
  },
  {
    path: "/video/:id/quiz",
    component: DefaultComponent,
    title: "Quiz",
    order: 4,
    hideInMenu: true,
  },
  {
    path: "/quiz/:videoId",
    component: pages.QuizPaginator,
    title: "Quiz",
    order: 5,
    hideInMenu: true,
  },
  {
    path: "/batch/quiz/check",
    component: pages.CheckQuizPage,
    title: "Quiz",
    order: 5,
    hideInMenu: true,
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

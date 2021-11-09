import { DefaultComponent } from "./default-component";
import { Fragment } from "react";
import { Login } from "./guest/login";
import { Batch } from "./admin/batch";
import { People, OndemandVideo, School } from "@mui/icons-material";

const hideInMenu = true;

const AdminDefault = DefaultComponent("ADMIN");
const GuestDefault = DefaultComponent("GUEST");

export const admin: RouteDefinition[] = [
  {
    path: "/batch",
    component: Batch,
    name: "menagement batch",
    key: "batch-index",
    icon: People,
  },
  {
    path: "/batch/:id",
    component: AdminDefault,
    name: "batch-show",
    key: "batch-show",
    icon: Fragment,
    hideInMenu,
  },
  {
    path: "/video/:id/quiz",
    component: AdminDefault,
    name: "video-quiz",
    key: "video-quiz",
    icon: Fragment,
    hideInMenu,
  },
  {
    path: "/quiz/:videoId",
    component: AdminDefault,
    name: "video-quiz-index",
    key: "video-quiz-index",
    icon: Fragment,
    hideInMenu,
  },
  {
    path: "/batch/:batchId/check-quiz",
    component: AdminDefault,
    name: "batch-quiz-index",
    key: "batch-quiz-index",
    icon: Fragment,
    hideInMenu,
  },
  {
    path: "/video",
    component: AdminDefault,
    name: "video pembelajaran",
    key: "video-index",
    icon: OndemandVideo,
  },
  {
    path: "/student",
    component: AdminDefault,
    name: "siswa",
    key: "student-index",
    icon: School,
  },
];
export const guest: RouteDefinition[] = [
  {
    path: "/login",
    component: Login,
    name: "login",
    key: "login",
    icon: Fragment,
  },
];
export const student: RouteDefinition[] = [];

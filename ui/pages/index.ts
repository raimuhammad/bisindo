import { DefaultComponent } from "./default-component";
import { createElement, Fragment } from "react";
import { Login } from "./guest/login";
import { Batch } from "./admin/batch";
import { BatchShow } from "./admin/batch.show";
import { People } from "@mui/icons-material";
import { VideoPage as AdminVideoPage } from "./admin/video/video-page";
import { VideoList } from "@admin-pages/batch.show/video-list";
import { AddVideo } from "@admin-pages/batch.show/add-video";
import { StudentList } from "@admin-pages/batch.show/student-list";
import { QuizCheck } from "@admin-pages/batch.show/quiz-check";
import { Discussion } from "@admin-pages/batch.show/discussion";
import { Info } from "@admin-pages/video/info";
import { Quiz } from "@admin-pages/video/quiz";
import { EditForm } from "@admin-pages/video/edit-form";
import { Navigate } from "react-router-dom";
import { Discussion as Studentdiscusion } from "@student-pages/discussion";
import { Progress } from "@student-pages/progress";
import { Videos } from "@student-pages/videos";
import { StudentVideo } from "@student-pages/video";

const hideInMenu = true;

const AdminDefault = DefaultComponent("ADMIN");
const GuestDefault = DefaultComponent("GUEST");
export const admin: RouteDefinition[] = [
  {
    path: "classroom/:slug/:id",
    component: BatchShow,
    groups: [
      // {
      //   path: "*",
      //   component: VideoList,
      //   name: "batch-show-video",
      // },
      {
        path: "videos",
        component: VideoList,
        name: "batch-show-video",
      },
      {
        path: "add-video",
        component: AddVideo,
        name: "batch-show-add-vide",
      },
      {
        path: "students",
        component: StudentList,
        name: "batch-show-student",
      },
      {
        path: "quiz-check",
        component: QuizCheck,
        name: "batch-show-quiz-check",
      },
      {
        path: "discussion",
        component: Discussion,
        name: "batch-show-discussion",
      },
    ],
    key: "classroom-show",
    icon: Fragment,
    name: "classroom show",
  },
  {
    path: "classroom",
    component: Batch,
    name: "menagement batch",
    key: "batch-index",
    icon: People,
  },
  {
    path: "admin/video/:id",
    component: AdminVideoPage,
    name: "admin-video-page",
    key: "admin-video-page",
    icon: Fragment,
    hideInMenu,
    groups: [
      {
        path: "*",
        component: Info,
        name: "Informasi video",
      },
      {
        path: "info",
        component: Info,
        name: "Informasi video",
      },
      {
        path: "quiz",
        component: Quiz,
        name: "Quis",
      },
      {
        path: "edit",
        component: EditForm,
        name: "Edit",
      },
    ],
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
  {
    path: "/",
    component: () => createElement(Navigate, { to: "/login" }),
    name: "login",
    key: "login",
    icon: Fragment,
  },
];
export const student: RouteDefinition[] = [
  Progress,
  Videos,
  Studentdiscusion,
  StudentVideo,
];

import { Fragment } from "react";
import { useStudentNavs } from "@layout/student";

const Index = () => {
  useStudentNavs([]);

  return <div>video page</div>;
};
export const Videos: RouteDefinition = {
  component: Index,
  name: "videos",
  path: "/videos",
  icon: Fragment,
  key: "videos",
};

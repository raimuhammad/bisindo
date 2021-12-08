import { Fragment, useEffect } from "react";
import { useLayout } from "@layout/layout-provider";

const component = () => {
  const { updateNavs } = useLayout();

  useEffect(() => {
    updateNavs([
      {
        label: "Progress",
        path: "progress",
      },
      {
        label: "Video pembelajaran",
        path: "videos",
      },
      {
        label: "Diskusi",
        path: "discussion",
      },
    ]);
  }, []);

  return <div></div>;
};

export const Dashboard: RouteDefinition = {
  path: "/dashboard",
  name: "dashboard",
  icon: Fragment,
  component,
  key: "dashboard",
};

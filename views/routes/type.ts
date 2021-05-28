import { ComponentType, ReactNode } from "react";

export type Route = {
  path: string;
  component: ComponentType<any>;
  icon?: ReactNode;
  title: string;
  order: number;
};

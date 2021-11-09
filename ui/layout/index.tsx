import type { ComponentType } from "react";
import { Admin } from "./admin";
import { Guest } from "./guest";
import { Student } from "./student";
import { AppRole } from "@root/models";
import { useApp } from "@providers/application-provider";

const LayoutMap: Record<string, ComponentType<any>> = {
  [AppRole.ADMIN]: Admin,
  [AppRole.STUDENT]: Student,
  GUEST: Guest,
};

export const Layout = (props: any) => {
  const { user } = useApp();
  const role = user ? user.role : "GUEST";
  const Selected = LayoutMap[role as keyof typeof LayoutMap];
  return <Selected {...props} />;
};

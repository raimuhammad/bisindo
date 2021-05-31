import * as React from "react";
import { useLayout } from "@root/layout";

type IStudentLayout = ReturnType<typeof useLayout> & { pageHeight: number };

export const Context = React.createContext<null | IStudentLayout>(null);

export const useStudentLayout = () => {
  return React.useContext(Context) as IStudentLayout;
};

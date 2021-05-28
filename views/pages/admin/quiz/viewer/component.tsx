import * as React from "react";
import { useStore } from "../provider";
import { ViewMode } from "./view-mode";
import { FormMode } from "./form-mode";
import { DeleteMode } from "./delete-mode";

export const Component = () => {
  const { mode } = useStore();
  return mode === "create" ? (
    <FormMode />
  ) : (
    <>
      <ViewMode />
      <DeleteMode />
    </>
  );
};

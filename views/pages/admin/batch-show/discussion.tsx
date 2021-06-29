import * as React from "react";
import { Wrapper } from "@components/discussion-wrapper/wrapper";
import { useStore } from "./provider";

export const Discussion = () => {
  const { model, contentHeight } = useStore();
  return <Wrapper grade={model} height={contentHeight} />;
};

import * as React from "react";
import { PreviewWrapper } from "./image-match-preview";
import { useWatch } from "react-hook-form";

export const ImageMatchForm = () => {
  const text = useWatch({
    name: "text",
    defaultValue: "",
  });
  return <PreviewWrapper text={text} />;
};

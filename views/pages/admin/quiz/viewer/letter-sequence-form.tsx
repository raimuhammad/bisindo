import * as React from "react";
import { useWatch } from "react-hook-form";
import { LetterSequencePreview } from "./letter-sequence-preview";

export const LetterSequenceForm = () => {
  const text = useWatch({
    name: "text",
    defaultValue: "",
  });
  return <LetterSequencePreview text={text} />;
};

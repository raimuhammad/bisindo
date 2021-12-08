import { createContext, useContext, useEffect, useRef, useState } from "react";
import { UseLetterSequence } from "./types";
export const LetterSequenceContext = createContext<null | UseLetterSequence>(
  null
);
export function useLetterContext() {
  return useContext(LetterSequenceContext) as UseLetterSequence;
}

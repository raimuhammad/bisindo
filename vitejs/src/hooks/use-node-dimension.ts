import { useNodeRef } from "./use-node-ref";
import { useState } from "react";
export function useNodeDimension() {
  const [dimension, setDimension] = useState<
    Omit<ReturnType<HTMLElement["getBoundingClientRect"]>, "toJSON">
  >({
    height: 0,
    width: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    y: 0,
    x: 0,
  });
  const callback = (e: HTMLElement) => {
    setDimension(e.getBoundingClientRect());
  };
  const { nodeRef } = useNodeRef({ callback });
  return {
    dimension,
    nodeRef,
  };
}

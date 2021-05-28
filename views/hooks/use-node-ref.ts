import { useEffect, useRef } from "react";

type Options<T extends HTMLElement> = {
  callback(e: T): void;
};

export function useNodeRef<T extends HTMLElement>({ callback }: Options<T>) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (ref.current) {
      callback(ref.current);
    }
  }, [ref]);
  return {
    nodeRef: ref,
  };
}

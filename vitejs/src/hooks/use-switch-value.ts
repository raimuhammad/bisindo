import { useState } from "react";

type UseSwitchValue<T> = [T, (v: T) => () => void];

export function useSwitchValue<T>(
  options: T[],
  initial: null | T = null
): UseSwitchValue<T> {
  const [value, setValue] = useState(() => {
    if (initial) return initial;
    return options[0];
  });
  const handler = (v: T) => {
    return () => setValue(v);
  };
  return [value, handler];
}

import { useCallback, useState } from "react";

type Action = {
  toggle: () => void;
  force: (v: boolean) => () => void;
  inline(v: boolean): void;
};

export function useToggle(initial = false): [boolean, Action] {
  const [loading, setLoading] = useState<boolean>(initial);
  const force = useCallback((v: boolean) => {
    return () => setLoading(v);
  }, []);
  const toggle = useCallback(() => {
    setLoading(!loading);
  }, [loading]);
  return [loading, { force, toggle, inline: setLoading }];
}

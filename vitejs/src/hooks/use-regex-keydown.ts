import { useCallback } from "react";

type Options = {
  limit?: number;
  regex: RegExp;
  whenRegexInvalid(): void;
  whenRecoverError(): void;
};

export function useRegexKeydown({
  limit = -1,
  regex,
  whenRegexInvalid,
  whenRecoverError,
}: Options) {
  const testLimit = (v: string) => {
    if (limit === -1) return false;
    return v.length >= limit;
  };

  const callback = useCallback((e: any) => {
    const test = regex.test(e.key);
    const target = e.target as HTMLInputElement;
    const isAlphaNumeric =
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 65 && e.keyCode <= 90);
    if (isAlphaNumeric) {
      if (!test || testLimit(target.value)) {
        if (!test) {
          e.preventDefault();
          return whenRegexInvalid();
        }
        return e.preventDefault();
      }
    }
    const isInvalid = target.getAttribute("aria-invalid");
    if (isAlphaNumeric && isInvalid && isInvalid === "true") {
      return whenRecoverError();
    }
  }, []);
  return {
    onKeyDown: callback,
  };
}

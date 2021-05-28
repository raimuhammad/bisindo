import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import voca from "voca";

export function useNavigate() {
  const history = useHistory();
  const navigate = useCallback((path: string) => history.push(path), []);
  const withParames = (path: string, params: Record<string, any>) => {
    let to = voca(path);
    Object.keys(params).forEach((key) => {
      to = to.replaceAll(`:${key}`, params[key]);
    });
    return navigate(to.value());
  };

  const callback = useCallback(
    (path: string, params: Record<string, any> = {}) => {
      return () => {
        if (params) {
          return withParames(path, params);
        }
        navigate(path);
      };
    },
    []
  );

  return { navigateHandler: callback, navigate };
}

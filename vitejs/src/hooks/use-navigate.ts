import { useHistory } from "react-router-dom";
import { useCallback } from "react";

export function useNavigate() {
  const history = useHistory();
  const navigate = useCallback((path: string) => history.push(path), []);
  const callback = useCallback((path: string) => {
    return () => navigate(path);
  }, []);
  return { navigateHandler: callback, navigate };
}

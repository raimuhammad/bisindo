import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useToggle } from "@hooks/use-toggle";
import { useContentPaginator } from "@service-provider/content";
import { VideoModelType } from "@root/models";
import { useStore } from "@pages/admin/batch-show/provider";

export type Action = "EDIT" | "DELETE" | null;

export function useManageAction() {
  const [mode, setMode] = useState<Action>(null);
  const [hasLoading, { inline }] = useToggle();
  const modeHandler = useCallback((mode: Action) => {
    return () => setMode(mode);
  }, []);
  const close = () => {
    if (!hasLoading) {
      setMode(null);
    }
  };
  const is = useCallback((v: Action): boolean => v === mode, [mode]);
  return {
    whenLoading: inline,
    close,
    is,
    mode,
    handleEdit: modeHandler("EDIT"),
    handleDelete: modeHandler("DELETE"),
  };
}

type UseVideoAction = ReturnType<typeof useManageAction>;

export const Provider = createContext<null | UseVideoAction>(null);

export function useAction(): UseVideoAction {
  return useContext(Provider) as UseVideoAction;
}

type UseFormCallbackOption = {
  loading: boolean;
  disableRefresh?: boolean;
};

export function useFormCallback({
  loading,
  disableRefresh = false,
}: UseFormCallbackOption) {
  const { close, whenLoading } = useAction();
  const { reset } = useContentPaginator();
  const { refetch } = useStore();
  useEffect(() => {
    whenLoading(loading);
  }, [loading]);
  return () => {
    if (!disableRefresh) {
      reset();
      refetch();
    }
    whenLoading(false);
    close();
  };
}

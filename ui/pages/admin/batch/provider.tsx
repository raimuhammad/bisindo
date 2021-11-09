import { PaginatorProvider } from "@providers/model-provider/paginators";
import { useAdminLayout } from "@layout/admin.context";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { GradeModelType } from "@root/models";
import { useIsSm } from "@hooks/use-media";

export type BatchTabType = "videos" | "student" | "editor";

const tablist: BatchTabType[] = ["videos", "student", "editor"];

type State = {
  selected: GradeModelType | null;
  tab: BatchTabType;
  mobileControlTab: "list" | "manage";
};

export const useBatchProvider = () => {
  const [state, setState] = useState<State>({
    selected: null,
    mobileControlTab: "list",
    tab: "videos",
  });
  const { selected, mobileControlTab } = state;
  const isSm = useIsSm();
  const setSelected = useCallback(
    (model: GradeModelType) => {
      setState((c) => ({ ...c, selected: model, mobileControlTab: "manage" }));
    },
    [mobileControlTab]
  );
  const setTab = useCallback((tab: BatchTabType) => {
    setState((c) => ({ ...c, tab }));
  }, []);
  const setMobileControlTab = useCallback((tab: "list" | "manage") => {
    setState((c) => ({ ...c, mobileControlTab: tab }));
  }, []);

  useEffect(() => {
    if (selected) {
      setTab("videos");
    }
  }, [selected]);

  const setModel = useCallback((model: GradeModelType) => {
    return () => setSelected(model);
  }, []);
  return {
    selected,
    tablist,
    activeTab: state.tab,
    mobileControlTab,
    setMobileControlTab,
    setActiveTab: setTab,
    setModel,
  };
};

type IBatchPageProvider = ReturnType<typeof useBatchProvider>;
export const BatchContext = createContext<null | IBatchPageProvider>(null);

export function useBatchPage(): IBatchPageProvider {
  return useContext(BatchContext) as IBatchPageProvider;
}

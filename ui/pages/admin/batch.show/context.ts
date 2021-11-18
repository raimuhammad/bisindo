import type { GradeModelType } from "@root/models";
import type { Options, UseShowProvider } from "@hooks/use-show-provider";
import { useShowProvider } from "@hooks/use-show-provider";
import { RootStoreBaseQueries } from "@root-model";
import { createContext, useContext, useEffect, useState } from "react";
import { useAdminLayout } from "@layout/admin.context";
import voca from "voca";

const items = [
  "VIDEOS",
  "ADD-VIDEO",
  "STUDENTS",
  "QUIZ-CHECK",
  "DISCUSSION",
] as const;

type PageControl = {
  page: string;
  animate: "x" | "opacity";
  animateDirection: "left" | "right";
};

function usePageControll() {
  const [state, setPage] = useState<PageControl>({
    page: "VIDEOS",
    animate: "opacity",
    animateDirection: "left",
  });
  const changeContent = (content: typeof items[number]) => {
    const nextIndex = items.findIndex((item) => item === content);
    const currentIndex = items.findIndex((item) => item === state.page);
    const animateDirection = nextIndex > currentIndex ? "left" : "right";
    setPage({
      page: content,
      animateDirection,
      animate: "x",
    });
  };
  return {
    pageControll: [state, changeContent] as [PageControl, (v: string) => void],
  };
}

function useProvider({ pageLoading, model, hasResponse }: any) {
  const [showpage, setShowPage] = useState(false);
  const [progress, setProgress] = useState(false);
  const showProgress = () => setProgress(true);
  const hideProgress = () => setProgress(false);
  useEffect(() => {
    if (!pageLoading && model && hasResponse) {
      setTimeout(() => {
        setShowPage(true);
      }, 1000);
    }
  }, [pageLoading, hasResponse, model]);
  const { pageControll } = usePageControll();
  return {
    showpage,
    progress,
    pageControll,
    showProgress,
    hideProgress,
  };
}
type IBatchShowPage = UseShowProvider<
  GradeModelType,
  ReturnType<typeof useProvider>
>;
const getOptions = (id: string): Options<ReturnType<typeof useProvider>> => ({
  api: RootStoreBaseQueries.queryGradeById,
  id,
  provider: useProvider,
});
export const Context = createContext<IBatchShowPage | null>(null);
export function useBatchShow() {
  return useContext(Context) as IBatchShowPage;
}
export function useBatchShowProvider(location: any) {
  const { id, slug } = location.match.params;
  const { setTitle } = useAdminLayout();
  useEffect(() => {
    setTitle(" ");
    return () => {
      setTitle("");
    };
  }, []);
  return useShowProvider(getOptions(id)) as IBatchShowPage;
}
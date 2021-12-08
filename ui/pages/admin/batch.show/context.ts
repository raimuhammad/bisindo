import type { GradeModelType } from "@root/models";
import type { Options, UseShowProvider } from "@hooks/use-show-provider";
import { useShowProvider } from "@hooks/use-show-provider";
import { RootStoreBaseQueries } from "@root-model";
import { createContext, useContext, useEffect, useState } from "react";
import { useAdminLayout } from "@layout/admin.context";
import { usePageSwitcher } from "@components/admin-page-content";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useLayout } from "@layout/layout-provider";

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
  const pageControl = usePageSwitcher(items as unknown as string[]);
  const push  = useNavigate();
  const { pathname } = useLocation();
  const [page, setPage] = useState<string>("Videos");
  const [state, setState] = useState<Omit<PageControl, 'page'>>({
    animate: "x",
    animateDirection: "left",
  });
  const { id, slug } = useParams<any>();
  useEffect(() => {
    let type = pathname.split("/").pop();
    if (type === "batch") {
      type = "videos";
    }
    if (type) {
      const isExist = items.includes((type as any).toLocaleUpperCase());
      if (!isExist) {
        // push(`/batch/${slug}/${id}/videos`);
        return;
      }
      setPage(type.toLocaleUpperCase());
    }
  }, [pathname]);

  const changeContent = (content: typeof items[number]) => {
    const nextIndex = items.findIndex((item) => item === content);
    const currentIndex = items.findIndex((item) => item === page);
    const animateDirection = nextIndex > currentIndex ? "left" : "right";
    setState({
      animateDirection,
      animate: "x",
    });
  };
  return {
    pageControll: [{...state, page}, changeContent] as [PageControl, (v: string) => void],
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

export function useBatchShowProvider(params: any) {
  const { id, slug } = params;
  const { setTitle } = useAdminLayout();
  const { updateNavs } = useLayout();

  useEffect(() => {
    setTitle(" ");
    updateNavs([]);
    const getPath = ({ path, label }: any) => {
      return {
        path: `/classroom/${slug}/${id}/${path}`,
        label,
      };
    };
    const navs = [
      {
        label: "Video",
        path: "videos",
      },
      {
        label: "Tambah video",
        path: `add-video`,
      },
      {
        label: "Siswa",
        path: `students`,
      },
      {
        label: "Periksa quis",
        path: `quiz-check`,
      },
      {
        label: "Diskusi",
        path: `discussion`,
      },
    ].map(getPath);
    updateNavs(navs);
    return () => {
      setTitle("");
    };
  }, [id]);
  return useShowProvider(getOptions(id)) as IBatchShowPage;
}

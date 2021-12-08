import { RootStoreType, useQuery, VideoModelType } from "@root/models";
import { ComponentType, createContext, useContext, useEffect } from "react";
import { useAdminLayout } from "@layout/admin.context";
import { Outlet, useParams } from "react-router-dom";
import { useLayout } from "@layout/layout-provider";
import { ScreenLoading } from "@components/screen-loading";
import { observer } from "mobx-react";

export const useVideoPageProvider = ({ id }: any) => {
  const { data, loading, setQuery } = useQuery<{ video: VideoModelType }>();
  const refresh = () => {
    setQuery((store: RootStoreType) =>
      store.queryVideo(
        {
          id,
        },
        (selector) => {
          return selector.id.content.caption.description.duration.quiz_count.thumbnail.title.grades(
            (item) => item.id.name
          );
        }
      )
    );
  };
  const { setTitle } = useAdminLayout();
  useEffect(() => {
    setTitle("Menagamen video");
    return () => setTitle("");
  }, []);
  useEffect(() => {
    refresh();
  }, [id]);
  return {
    video: data ? (data.video as VideoModelType) : null,
    isNotFound: data && !data.video,
    loading,
  };
};
type UseVideoPage = ReturnType<typeof useVideoPageProvider>;
export const VideoPageContext = createContext<null | UseVideoPage>(null);
export function useVideoPage(): UseVideoPage {
  return useContext(VideoPageContext) as UseVideoPage;
}
const navs = [
  {
    path: "info",
    name: "Informasi video",
  },
  {
    path: "quiz",
    name: "Quis",
  },
  {
    path: "edit",
    name: "Edit",
  },
];
export function withVideoPage(Component: ComponentType<any>) {
  return observer(() => {
    const params = useParams();
    const ctx = useVideoPageProvider(params);
    const { updateNavs } = useLayout();
    useEffect(() => {
      const getBase = (path: string) =>
        `/admin/video/${params.id}${path ? `/${path}` : ""}`;
      const paths = navs.map((item) => ({
        label: item.name,
        path: getBase(item.path === "/" ? "" : item.path),
      }));
      updateNavs([...paths]);
    }, []);
    return (
      <VideoPageContext.Provider value={ctx}>
        {!ctx.video || ctx.loading ? <ScreenLoading /> : <Component />}
      </VideoPageContext.Provider>
    );
  });
}

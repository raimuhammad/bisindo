import { useContent } from "../content.context";
import { useBatchPage } from "../provider";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { VideoModelType } from "@root/models";
import { observer } from "mobx-react";

type State = {
  video: null | VideoModelType;
  tab: "list" | "edit" | "quiz";
};
type Dispatcher = {
  changeVideo(v: VideoModelType): () => void;
  changeTab(v: "info" | "list" | "edit" | "quiz"): () => void;
};
function useVideoContent(): [State, Dispatcher] {
  const [{ data }] = useContent();
  const { selected } = useBatchPage();
  const [state, setState] = useState<State>({
    video: null,
    tab: "list",
  });
  const changeVideo = useCallback((video: VideoModelType) => {
    return () => {
      setState((prevState) => ({
        ...prevState,
        video,
      }));
    };
  }, []);
  const changeTab = useCallback((tab) => {
    return () => {
      setState((prevState) => ({
        ...prevState,
        tab,
      }));
    };
  }, []);
  useEffect(() => {
    if (data && data.length) {
      changeVideo(data[0])();
    }
  }, [data, selected]);
  return [
    state,
    {
      changeVideo,
      changeTab,
    },
  ];
}
type IVideoContext = ReturnType<typeof useVideoContent>;
const Context = createContext<null | IVideoContext>(null);
export function useVideoContext() {
  return useContext(Context) as IVideoContext;
}
export const Provider = observer(({ children }: any) => {
  const contextValue = useVideoContent();
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
});

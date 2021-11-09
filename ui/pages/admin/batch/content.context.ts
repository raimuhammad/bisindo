import { createContext, useContext, useState } from "react";
import type { VideoModelType } from "@model";
import { useList, IListResultOf } from "@providers/model-provider/lists";

export function useContentProvider(): IContentProvider {
  const [tab, setTab] = useState<"add-video" | "videos" | "students" | "edit">(
    "videos"
  );
  const [selected, setSelectedVideo] = useState<null | VideoModelType>(null);
  const videoList = useList<VideoModelType>();
  const changeVideo = (video: VideoModelType) => () => setSelectedVideo(video);
  const changeTab = (value: any) => {
    return () => {
      setTab(value);
    };
  };
  return [
    {
      ...videoList,
      tab,
    },
    {
      changeTab,
    },
    videoList,
  ];
}

type IContentProvider = [
  {
    tab: string;
  } & Omit<IListResultOf<VideoModelType>, "fetch">,
  {
    changeTab(v: "add-video" | "videos" | "students" | "edit"): () => void;
  },
  IListResultOf<VideoModelType>
];

export const ContentContext = createContext<null | IContentProvider>(null);

export function useContent(): IContentProvider {
  return useContext(ContentContext) as IContentProvider;
}

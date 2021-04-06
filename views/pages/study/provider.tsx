import * as React from "react";
import { useYoutubeApi } from "hooks/use-youtube-api";

export type Video = gapi.client.youtube.SearchResult;

type StudyPageProvider = {
  videos: Video[];
  active: string;
  tabs: { key: string; label: string }[];
  handleChangeTab(e: any, v: string): void;
  handleChangeVideo(v: Video): void;
  video: Video;
  quiz: null | "soal1" | "soal2" | "soal3";
  handleQuiz(v: StudyPageProvider["quiz"]): void;
};

const Context = React.createContext<null | StudyPageProvider>(null);
const items = [
  { key: "/video", label: "Video" },
  { key: "/discussion", label: "Diskusi" },
  { key: "/quiz", label: "Quis" },
];
export function useStudyPage(): StudyPageProvider {
  return React.useContext(Context) as StudyPageProvider;
}

export const Provider = ({ children }: React.PropsWithChildren<any>) => {
  const [videos, loading] = useYoutubeApi("belajar bisindo pemula");
  const [active, setTab] = React.useState(items[0].key);
  const handleChangeTab = (e: any, v: string) => {
    setTab(v);
  };
  const [quiz, setQuiz] = React.useState<StudyPageProvider["quiz"]>(null);
  const [index, setIndex] = React.useState<number>(0);

  const handleChangeVideo = ({ id }: Video) => {
    const find = videos.findIndex((item) => item?.id?.videoId === id?.videoId);
    if (find !== -1) {
      setIndex(find);
    }
  };
  const values: StudyPageProvider = {
    videos,
    active,
    tabs: items,
    video: videos[index],
    handleChangeTab,
    handleChangeVideo,
    quiz,
    handleQuiz: setQuiz,
  };
  const shouldRender = !loading && videos.length;
  return (
    <Context.Provider value={values}>
      {shouldRender && children}
    </Context.Provider>
  );
};

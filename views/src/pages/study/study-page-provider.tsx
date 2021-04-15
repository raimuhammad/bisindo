import * as React from "react";
import { useYoutubeApi } from "hooks/use-youtube-api";
import gapiJson from "root/gapi.json";
import ReactHotkeys from "react-hot-keys";

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
  const [active, setTab] = React.useState(items[0].key);
  const handleChangeTab = (e: any, v: string) => {
    setTab(v);
  };
  const [quiz, setQuiz] = React.useState<StudyPageProvider["quiz"]>(null);
  const [index, setIndex] = React.useState<number>(0);
  const [gapiloaded, setGapiLoaded] = React.useState<boolean>(false);
  const [videos, loading] = useYoutubeApi("belajar bisindo pemula", gapiloaded);

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.addEventListener("load", () => {
      const apikey = gapiJson.apiKey;
      gapi.load("client", () => {
        gapi.client.setApiKey(apikey);
        gapi.client
          .load(
            "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
            "v3"
          )
          .then(() => {
            setGapiLoaded(true);
          });
      });
    });
    document.body.append(script);
  }, []);

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
  const shouldRender = !loading && videos.length && gapiloaded;

  const handleKey = (key: string) => {
    console.log(key);
    switch (key) {
      case "shift+1": {
        setQuiz("soal1");
        break;
      }
      case "shift+2": {
        setQuiz("soal2");
        break;
      }
      case "shift+3": {
        setQuiz("soal3");
        break;
      }
    }
  };

  return (
    <ReactHotkeys onKeyUp={handleKey} keyName="shift+1,shift+2,shift+3">
      <Context.Provider value={values}>
        {shouldRender ? children : null}
      </Context.Provider>
    </ReactHotkeys>
  );
};

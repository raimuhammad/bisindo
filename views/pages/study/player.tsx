import * as React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { useStudyPage } from "./provider";
import ReactPlayer from "react-player";
import { useSnackbar } from "notistack";

const useClasses = makeStyles((theme) => ({
  root: {
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflowY: "hidden",
    position: "relative",
  },
  video: {
    height: "70%",
    flexGrow: 1,
    position: "relative",
    zIndex: 2,
  },
  player: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  content: {
    height: "30%",
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: "white",
    padding: theme.spacing(1),
    zIndex: 2,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(250,250,250,0.6)",
    zIndex: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const useYoutubeQuery = (): [gapi.client.youtube.Video | null, boolean] => {
  const { video } = useStudyPage();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<null | gapi.client.youtube.Video>(
    null
  );

  React.useEffect(() => {
    if (gapi && gapi.client.youtube) {
      const yt = gapi.client.youtube;
      setLoading(true);
      yt.videos
        .list({
          part: ["snippet"],
          id: video.id?.videoId as string,
        })
        .then((video) => {
          setLoading(false);
          if (video.result) {
            setQuery({
              // @ts-ignore
              ...(video.result.items[0] as gapi.client.youtube.Video),
            });
          }
        });
    }
  }, [video]);

  return [query, loading];
};

export function useQuizDispacther(
  value: boolean,
  quis: "soal1" | "soal2" | "soal3",
  handlePlay: (v: boolean) => void
) {
  const { handleQuiz } = useStudyPage();

  React.useEffect(() => {
    if (value) {
      setTimeout(() => {
        handleQuiz(quis);
        handlePlay(false);
      }, 5000);
    }
  }, [value]);
}

export const Player = () => {
  const [video, loading] = useYoutubeQuery();
  const classes = useClasses();
  const paragraphs =
    video && video.snippet
      ? // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        video.snippet?.description.split("\n").filter(Boolean)
      : [];
  const { enqueueSnackbar } = useSnackbar();
  const [[soal1, soal2, soal3], setValues] = React.useState([
    false,
    false,
    false,
  ]);
  const [play, setPlayed] = React.useState<boolean>(false);
  useQuizDispacther(soal1, "soal1", setPlayed);
  useQuizDispacther(soal2, "soal2", setPlayed);
  useQuizDispacther(soal3, "soal3", setPlayed);

  const onProgress = ({ playedSeconds }: Record<"playedSeconds", number>) => {
    console.log(playedSeconds);
    if (playedSeconds > 5 && !soal1) {
      enqueueSnackbar("Kuis 1 akan dimulai");
      setValues([true, false, false]);
    }
    if (playedSeconds > 20 && !soal2) {
      enqueueSnackbar("Kuis 2 akan dimulai");
      setValues([true, true, false]);
    }
    if (playedSeconds > 73 && !soal3) {
      enqueueSnackbar("Kuis 3 akan dimulai");
      setValues([true, true, true]);
    }
  };

  return (
    <div className={classes.root}>
      {video && loading ? (
        <div className={classes.backdrop}>
          <CircularProgress color="secondary" />
        </div>
      ) : null}
      {video ? (
        <>
          <div className={classes.video}>
            <ReactPlayer
              playing={play}
              onPlay={() => setPlayed(true)}
              controls
              width="100%"
              height="100%"
              onProgress={onProgress}
              url={`https://youtube.com/watch?v=${video.id}`}
            />
          </div>
          <div className={classes.content}>
            <h1
              dangerouslySetInnerHTML={{
                __html: video.snippet?.title as string,
              }}
            />
            <div style={{ padding: ".5rem", width: "80%" }}>
              {(paragraphs || []).map((item, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: item,
                  }}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

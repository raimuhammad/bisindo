import ReactPlayer from "react-player";
import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { useStudyPage } from "pages/study/study-page-provider";
import { useSnackbar } from "notistack";

type Props = {
  video: gapi.client.youtube.Video;
};
const useClasses = makeStyles((theme) => ({
  videoWrapper: {
    paddingInline: theme.spacing(3),
  },
  playerContainer: {
    position: "relative",
    paddingTop: "56.25%",
    backgroundColor: "#181818",
  },
  player: {
    position: "absolute",
    top: 0,
    left: 0,
    "& > .ytp-show-cards-title": {
      display: "none",
    },
  },
}));

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

export const Teather = ({ video }: Props) => {
  const classes = useClasses();
  const [play, setPlayed] = React.useState<boolean>(false);
  const [[soal1, soal2, soal3], setValues] = React.useState([
    false,
    false,
    false,
  ]);
  useQuizDispacther(soal1, "soal1", setPlayed);
  useQuizDispacther(soal2, "soal2", setPlayed);
  useQuizDispacther(soal3, "soal3", setPlayed);
  const { enqueueSnackbar } = useSnackbar();
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
  if (!video) return null;
  return (
    <ReactPlayer
      playing={play}
      controls
      onProgress={onProgress}
      onPlay={() => setPlayed(true)}
      config={{
        youtube: {
          playerVars: {
            rel: 0,
          },
          embedOptions: {
            rel: 0,
          },
        },
      }}
      className={classes.player}
      width="100%"
      height="100%"
      url={`https://youtube.com/watch?v=${video.id}`}
    />
  );
};

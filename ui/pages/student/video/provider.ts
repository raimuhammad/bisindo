import { useParams } from "react-router-dom";
import {
  QuizModelType,
  RootStoreType,
  useQuery,
  VideoModelType,
} from "@root/models";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Player } from "@vime/react";
import { useMount, usePrevious } from "react-use";
import { useSnackbar } from "notistack";
import { useToggle } from "@hooks/use-toggle";

const builder = (selector: any) => {
  return selector.content.id.title.thumbnail.caption.quiz_count.quizes(
    (b: any) => {
      return b.id.type.choises((t: any) => t.id.text.image.index).image_matcher
        .additional_image.questionAnswer.question.show_at;
    }
  );
};
const useQuiz = (quizes: QuizModelType[]) => {
  const [selected, setSelected] = useState<null | QuizModelType>(null);
  const handleClose = () => setSelected(null);
  const handleOpen = (quiz: QuizModelType) => {
    return () => setSelected(quiz);
  };
  const { data } = useQuery((store: RootStoreType) => {
    return store.queryQuizAnswers();
  });
  return {
    show: Boolean(selected),
    handleClose,
    handleOpen,
    selected,
  };
};

const useVideoUtilities = (
  quizes: QuizModelType[] = [],
  utils: ReturnType<typeof useQuiz>
) => {
  const playerRef = useRef<HTMLVmPlayerElement>(null);
  const [preparedQuiz, setPreparedQuiz] = useState<null | QuizModelType>(null);
  const [disableSearch, { inline }] = useToggle();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (preparedQuiz) {
      enqueueSnackbar("Quiz akan segera di mulai");
      setTimeout(() => {
        console.log("called");
        utils.handleOpen(preparedQuiz)();
        playerRef.current?.pause();
      }, 5000);
    }
  }, [preparedQuiz]);

  const callback = useCallback(
    (e: any) => {
      if (!preparedQuiz) {
        const check = quizes.find((item) => {
          return (item.show_at as number) - 5 === Math.floor(e.detail);
        });
        if (check) {
          setPreparedQuiz(check);
        }
      }
    },
    [quizes, preparedQuiz]
  );
  useEffect(() => {
    const player: HTMLVmPlayerElement =
      playerRef.current as HTMLVmPlayerElement;
    if (player) {
      player.addEventListener("vmCurrentTimeChange", callback);
      return () => {
        player.removeEventListener("vmCurrentTimeChange", callback);
      };
    }
  }, [playerRef.current]);

  return {
    playerRef,
  };
};

export function useVideoPageProvider() {
  const params = useParams();
  const { loading, data } = useQuery<{ video: VideoModelType }>(
    (model: RootStoreType) => {
      return model.queryVideo(
        {
          id: params.id as string,
        },
        builder
      );
    }
  );
  const prevParams = usePrevious(params);
  const quizes = data && data.video ? data.video.quizes : [];
  const quiz = useQuiz(quizes);
  const videoUtilities = useVideoUtilities(quizes, quiz);
  return {
    videoUtilities,
    video: (data && data.video ? data.video : null) as VideoModelType,
    loading,
    showLoading: !data || !data.video,
    quiz,
  };
}
export type UseVideo = ReturnType<typeof useVideoPageProvider>;
export const Context = createContext<null | UseVideo>(null);
export function useVideo() {
  return useContext(Context) as UseVideo;
}

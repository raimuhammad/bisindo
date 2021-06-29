import * as React from "react";
import { useFetchQuery } from "@hooks/use-fetch-query";
import {
  QuizModelType,
  useQuery,
  VideoModelSelector,
  VideoModelType,
} from "@root/models";
import { RootStoreBaseQueries } from "@root-model";
import { createContext, useContext, useEffect, useState } from "react";
import { useToggle } from "@hooks/use-toggle";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "@hooks/use-navigate";
import { sortBy } from "lodash";
import { useSnackbar } from "notistack";
import { useFetchProgress } from "@providers/student-progress-provider/use-fetch-progress";

export type QuizHelper = QuizModelType & {
  show: boolean;
  isRightAnswer: boolean;
};

interface IVideoPage {
  video: VideoModelType;
  preparedQuiz: null | QuizHelper;
  showQuiz: boolean;
  quizes: QuizHelper[];
  playing: boolean;
  setPreparedQuiz(q: QuizHelper): void;
  onSubmitted(v: QuizHelper, a?: boolean): void;
  play(): void;
  pause(): void;
}

const Context = createContext<null | IVideoPage>(null);

export const useVideoPage = () => useContext(Context) as IVideoPage;

const mapping = (item: QuizModelType): QuizHelper => {
  return {
    ...item,
    show: false,
    isRightAnswer: false,
    durationText: item.durationText,
  } as QuizHelper;
};

const useQuizUtility = (quizes: Array<QuizModelType>) => {
  const [quizUtils, setQuizUtils] = useState<Array<QuizHelper>>([]);
  const [progress, progressLoading] = useFetchProgress();
  console.log(progress?.quizHistories);

  useEffect(() => {
    if (!quizUtils.length && progress) {
      const mapped = quizes.map(mapping).map(
        (item): QuizHelper => {
          const checkShowing = (c: any) => {
            return c.id.toString() === item.id.toString();
          };
          const getRightAnswer = () => {
            const check = progress.quizHistories.find(
              (c) => c.id.toString() === item.id.toString()
            );
            if (check) {
              return check.correct;
            }
            return false;
          };
          return {
            ...item,
            isRightAnswer: getRightAnswer(),
            show: Boolean(progress.quizHistories.find(checkShowing)),
          };
        }
      );
      console.log(mapped);
      setQuizUtils([...mapped]);
    }
  }, [quizes, progress]);

  const [preparedQuiz, setPreparedQuiz] = useState<null | QuizHelper>(null);

  const { enqueueSnackbar } = useSnackbar();

  const [playing, { force }] = useToggle();

  const [showQuiz, { inline }] = useToggle();

  useEffect(() => {
    if (showQuiz && preparedQuiz) {
      force(false)();
    }
  }, [showQuiz, preparedQuiz]);

  const { setQuery } = useQuery();

  const onSubmitted = (helper: QuizHelper, isRightAnswer = false) => {
    const mapped = quizUtils.map((item) => {
      if (item.id === helper.id) {
        item.show = true;
        item.isRightAnswer = isRightAnswer;
      }
      return item;
    });
    setQuery((store) => {
      return store.mutateUpdateQuizProgress({
        quizId: helper.id,
        correct: isRightAnswer,
      });
    });
    setQuizUtils([...mapped]);
    setPreparedQuiz(null);
    inline(false);
    force(true)();
  };

  useEffect(() => {
    if (preparedQuiz) {
      setTimeout(() => {
        inline(true);
      }, 5000);
      enqueueSnackbar("Quis akan segera di mulai", {
        variant: "info",
      });
    }
  }, [preparedQuiz]);

  const preparedQuizSetter = (helper: QuizHelper) => {
    if (!helper.show) {
      setPreparedQuiz(helper);
    }
  };

  return {
    quizes: quizUtils,
    showQuiz,
    playing,
    play: force(true),
    pause: force(false),
    setPreparedQuiz: preparedQuizSetter,
    preparedQuiz,
    onSubmitted,
    progressLoading,
    progress,
  };
};

export const Provider = observer(({ children }: any) => {
  const params = useParams<{ videoId: string }>();
  const [video, { loading, fetch, isNull }] = useFetchQuery<VideoModelType>({
    queryKey: RootStoreBaseQueries.queryVideo,
    builder(instance: VideoModelSelector) {
      return instance.title.thumbnail.id.content.caption.duration.description.quizes(
        (i) =>
          i.questionAnswer.id.type.show_at.question.additional_image.image_matcher.choises(
            (c) => c.id.text.image.index
          )
      );
    },
  });
  const { navigate } = useNavigate();
  useEffect(() => {
    if (isNull) {
      navigate("/study");
    }
  }, [isNull]);
  useEffect(() => {
    if (!params.videoId) {
      navigate("/study");
    } else {
      fetch({ id: params.videoId });
    }
  }, [params]);
  const quizes = video ? sortBy(video.quizes, "show_at") : [];
  const quisUtils = useQuizUtility(quizes);
  const context = {
    video: video as VideoModelType,
    ...quisUtils,
  } as IVideoPage;

  const getChild = () => {
    if (loading || !video) {
      return null;
    }
    if (!quisUtils.progress || quisUtils.progressLoading) {
      return null;
    }
    return children;
  };
  return <Context.Provider value={context}>{getChild()}</Context.Provider>;
});

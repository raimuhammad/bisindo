import * as React from "react";
import { useFetchQuery } from "@hooks/use-fetch-query";
import {
  QuizModelType,
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
import { toJS } from "mobx";
import { getSnapshot, SnapshotOut } from "mobx-state-tree";

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

  useEffect(() => {
    const mapped = quizes.map(mapping);
    if (!quizUtils.length && mapped.length) setQuizUtils([...mapped]);
  }, [quizes]);

  const [preparedQuiz, setPreparedQuiz] = useState<null | QuizHelper>(null);

  const { enqueueSnackbar } = useSnackbar();

  const [playing, { force }] = useToggle();

  const [showQuiz, { inline }] = useToggle();

  useEffect(() => {
    if (showQuiz && preparedQuiz) {
      force(false)();
    }
  }, [showQuiz, preparedQuiz]);

  const onSubmitted = (helper: QuizHelper, isRightAnswer = false) => {
    const mapped = quizUtils.map((item) => {
      if (item.id === helper.id) {
        item.show = true;
        item.isRightAnswer = isRightAnswer;
      }
      return item;
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
  return {
    quizes: quizUtils,
    showQuiz,
    playing,
    play: force(true),
    pause: force(false),
    setPreparedQuiz,
    preparedQuiz,
    onSubmitted,
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

  return (
    <Context.Provider value={context}>
      {!loading && video ? children : null}
    </Context.Provider>
  );
});

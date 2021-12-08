import { useParams } from "react-router-dom";
import {
  QuizModelType,
  RootStoreType,
  useQuery,
  VideoModelType,
} from "@root/models";
import { createContext, useContext, useState } from "react";

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
  const { data } = useQuery((store: RootStoreType)=>{
    return store.queryQuizAnswers()
  })
  return {
    show: Boolean(selected),
    handleClose,
    handleOpen,
    selected,
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
  const quiz = useQuiz(data && data.video ? data.video.quizes : []);
  return {
    video: (data && data.video ? data.video : null) as VideoModelType,
    loading,
    showLoading: !data || !data.video,
    quiz
  };
}
export type UseVideo = ReturnType<typeof useVideoPageProvider>;
export const Context = createContext<null | UseVideo>(null);
export function useVideo() {
  return useContext(Context) as UseVideo;
}

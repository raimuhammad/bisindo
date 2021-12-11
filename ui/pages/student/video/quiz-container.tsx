import { QuizViewerContainer } from "@components/quiz-viewer/quiz-viewer-container";
import { useVideo } from "./provider";
import { makeQuizProps } from "@components/quiz-form/utils";
import { QuizViewer } from "@components/quiz-viewer";
import { RootStoreType, useQuery } from "@root/models";

export const QuizContainer = () => {
  const {
    quiz: { show, handleClose, selected },
    videoUtilities,
  } = useVideo();
  const quizProps = selected
    ? makeQuizProps(selected.type as any, {
        text: selected.image_matcher as any,
        question: selected.question as any,
        answer: selected.questionAnswer as any,
        options: selected.choises as any,
        additionalFile: selected.additional_image as any,
        type: "text",
      })
    : {};
  const { store } = useQuery();
  const onSubmit = async (correct: boolean) => {
    if (selected) {
      return (store as RootStoreType)
        .mutateUpdateQuizProgress({
          quizId: selected.id,
          correct,
        })
        .currentPromise()
        .then(() => {
          const player = videoUtilities.playerRef?.current;
          if (player) {
            player.play();
          }
        });
    }
  };

  return (
    <QuizViewerContainer show={show} handleClose={handleClose}>
      {selected ? (
        <QuizViewer
          type={selected.type as any}
          onSubmit={onSubmit}
          viewerProps={quizProps}
        />
      ) : null}
    </QuizViewerContainer>
  );
};

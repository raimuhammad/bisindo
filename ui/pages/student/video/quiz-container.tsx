import { QuizViewerContainer } from "@components/quiz-viewer/quiz-viewer-container";
import { useVideo } from "./provider";
import { makeQuizProps } from "@components/quiz-form/utils";
import { QuizViewer } from "@components/quiz-viewer";

export const QuizContainer = () => {
  const {
    quiz: { show, handleClose, selected },
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
  return (
    <QuizViewerContainer show={show} handleClose={handleClose}>
      {selected ? (
        <QuizViewer type={selected.type as any} viewerProps={quizProps} />
      ) : null}
    </QuizViewerContainer>
  );
};

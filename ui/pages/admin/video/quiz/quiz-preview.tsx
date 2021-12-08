import { makeQuizProps } from "@components/quiz-form/utils";
import { QuizViewerContainer } from "@components/quiz-viewer/quiz-viewer-container";
import { QuizViewer } from "@components/quiz-viewer";
import { useQuizInfo } from "./provider";

export const QuizPreview = () => {
  const { handleSelected, selected, handleClose, action } = useQuizInfo();
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
    <QuizViewerContainer
      show={Boolean(selected && action === "quiz")}
      handleClose={handleClose}
    >
      {selected ? (
        <QuizViewer type={selected.type as any} viewerProps={quizProps} />
      ) : null}
    </QuizViewerContainer>
  );
};

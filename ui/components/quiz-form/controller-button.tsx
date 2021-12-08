import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import { useQuizForm, useQuizType } from "./provider";
import { useWatch } from "react-hook-form";
import { QuizViewerContainer } from "@components/quiz-viewer/quiz-viewer-container";
import { useToggle } from "@hooks/use-toggle";
import { QuizViewer } from "../quiz-viewer";
import { makeQuizProps } from "./utils";
import type { MultipleChoiseValues } from "./provider";

const initial: MultipleChoiseValues = {
  answer: 0,
  type: "text",
  question: "",
  additionalFile: null,
};

export const ControllerButton = ({
  onSubmit,
  loading,
}: {
  onSubmit(v?: any): void;
  loading: boolean;
}) => {
  const multipleChoice = useWatch<any>({
    name: "multipleChoice",
    defaultValue: initial,
  }) as MultipleChoiseValues;
  const text = useWatch({
    name: "text",
    defaultValue: "",
  });
  const options = useWatch({
    name: "multipleChoice.options",
    defaultValue: [],
  }) as any[];
  const type = useQuizType();
  const isFormValid = () => {
    if (type === "MULTIPLE_CHOICE") {
      const checkInvalidOptions = options.find((item) => !item.content);
      return Boolean(checkInvalidOptions) || !multipleChoice.question;
    } else {
      return !Boolean(text);
    }
  };
  const buttonProps = {
    disabled: isFormValid(),
    sx: { my: 2 },
    variant: "outlined",
  } as any;
  const quizProps = makeQuizProps(type, {
    ...multipleChoice,
    text,
    options,
  });
  const [showSimulation, { inline }] = useToggle();
  return (
    <>
      <QuizViewerContainer show={showSimulation} handleClose={inline}>
        <QuizViewer type={type} viewerProps={quizProps} />
      </QuizViewerContainer>
      <ButtonGroup
        sx={{
          "& > button": {
            textTransform: "none",
          },
        }}
        fullWidth
      >
        <Button onClick={() => inline(true)} {...buttonProps}>
          Tampilkan quis
        </Button>
        <Button
          {...buttonProps}
          disabled={buttonProps.disabled || loading}
          onClick={onSubmit}
          startIcon={loading ? <CircularProgress size={16} /> : undefined}
        >
          Simpan
        </Button>
      </ButtonGroup>
    </>
  );
};

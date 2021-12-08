import type { QuizType } from "@root/models";

type Props = {
  type: QuizType;
};

export function useQuizViewerProvider(props: Props) {
  return [
    {
      type: props.type,
    },
  ];
}

import { createContext, useContext, useEffect, useState } from "react";
import { QuizType, VideoModelType } from "@root/models";
import { useWatch } from "react-hook-form";

export type MultipleChoiseOption = {
  content: string | File | null;
  type: "text" | "image";
  index: number;
};
export const IndexMap = ["A", "B", "C", "D"];
export const multipleChoiceTextInitial: MultipleChoiseOption[] = IndexMap.map(
  (item, index) => ({
    content: "",
    type: "text",
    index,
  })
);
export const multipleChoiceImageInitial: MultipleChoiseOption[] = IndexMap.map(
  (item, index) => ({
    content: null,
    type: "image",
    index,
  })
);
export type MultipleChoiseValues = {
  answer: number;
  question: string;
  additionalFile?: File | null;
  type: "text" | "image";
};
type FormValues = {
  type: QuizType;
  text: string;
  multipleChoise: MultipleChoiseValues;
};
export type Props = {
  video: VideoModelType;
  onSuccess(): void;
};
export function useQuizFormProvider({ video }: Props) {
  const [formValues, setFormValues] = useState<FormValues>({
    type: QuizType.IMAGE_MATCH,
    text: "",
    multipleChoise: {
      answer: 0,
      question: "",
      additionalFile: null,
      type: "text",
    },
  });
  const [options, setOptions] = useState<MultipleChoiseOption[]>(
    multipleChoiceTextInitial
  );
  useEffect(() => {
    console.log("called");
    if (formValues.multipleChoise.type === "text") {
      setOptions([...multipleChoiceTextInitial]);
    } else {
      setOptions([...multipleChoiceImageInitial]);
    }
  }, [formValues.multipleChoise]);
  const changeType = (v: any) => {
    const props: any = {
      ...formValues,
      text: "",
      type: v,
    };
    if (v === QuizType.MULTIPLE_CHOICE) {
      props.multipleChoise = {
        answer: 0,
        type: "text",
        question: "",
        additionalFile: null,
      };
    }
    setFormValues({ ...props });
  };
  const onTextChange = (e: any) => {
    setFormValues({
      ...formValues,
      text: e,
    });
  };
  const changeMultipleChoiseOptions = (index: number) => {
    return (v: any) => {
      const newArr = [...options];
      newArr[index].content = v;
      setOptions([...newArr]);
    };
  };
  const onMultipleChoiseChange = (name: keyof MultipleChoiseValues) => {
    return (v: any) => {
      const values: any = {
        ...formValues.multipleChoise,
        [name]: v,
      };
      setFormValues({
        ...formValues,
        multipleChoise: {
          ...values,
        },
      });
    };
  };

  const callbacks = {
    onMultipleChoiseChange,
    onTextChange,
    changeMultipleChoiseOptions,
  };
  return {
    multipleChoiseOptions: options,
    formValues,
    callbacks,
    changeType,
    video,
  };
}
export type IQuizForm = ReturnType<typeof useQuizFormProvider>;
export const QuizFormContext = createContext<null | IQuizForm>(null);
export function useQuizType() {
  const type = useWatch<{ type: QuizType }>({
    name: "type",
    defaultValue: QuizType.IMAGE_MATCH,
  });
  return type;
}
export function useQuizForm(): IQuizForm {
  return useContext(QuizFormContext) as IQuizForm;
}

import * as React from "react";
import { createContext, useContext, useEffect } from "react";
import {
  ImageMatchSchema,
  multipleChoiceSchema,
  service,
} from "@services/quiz-service";
import { QuizModelType, QuizType } from "@root/models";
import { observer } from "mobx-react";
import { MutateServiceHookReturn } from "@utils/mutation-service-factory";
import { useSuccessModal } from "@hooks/use-success-modal";
import { RootStoreBaseMutations } from "@root-model";

type Props = {
  type: QuizType;
  videoId: string;
  onSuccess(): void;
  formRef?: React.MutableRefObject<UseQuizForm | null>;
};

const forms = service.create;

export type UseQuizForm = MutateServiceHookReturn<QuizModelType, any, any>;

export const Context = createContext<null | UseQuizForm>(null);

export function useQuizForm(): UseQuizForm {
  return useContext(Context) as UseQuizForm;
}

const SchemaMap: Record<QuizType, any> = {
  LETTER_SEQUENCE: ImageMatchSchema,
  IMAGE_MATCH: ImageMatchSchema,
  MULTIPLE_CHOICE: multipleChoiceSchema,
};
const mutateMap: Record<QuizType, RootStoreBaseMutations> = {
  LETTER_SEQUENCE: RootStoreBaseMutations.mutateLetterSequenceQuiz,
  IMAGE_MATCH: RootStoreBaseMutations.mutateImageMatchQuiz,
  MULTIPLE_CHOICE: RootStoreBaseMutations.mutateMultipleChoiseQuiz,
};

export const FormProvider = observer(
  ({
    type,
    videoId,
    children,
    onSuccess,
    formRef,
  }: React.PropsWithChildren<Props>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const form = forms[type]({
      injectInput: {
        videoId,
      },
      inputParser(args: any) {
        if ("options" in args) {
          args.options = args.options.map(({ content, index }: any) => {
            const key = content instanceof File ? "image" : "text";
            return {
              index,
              [key]: content,
            };
          });
        }
        return args;
      },
    });

    const Provider = form.provider;
    useEffect(() => {
      form.updateSchema(SchemaMap[type]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      form.updateMutation(mutateMap[type]);
    }, [type]);
    useEffect(() => {
      if (formRef) formRef.current = form;
    }, [form]);
    useSuccessModal({
      callback: onSuccess,
      depedencies: Boolean(form.result),
      message: "Quis baru berhasil di tambahkan",
    });
    return (
      <Context.Provider value={form}>
        <Provider>{children}</Provider>
      </Context.Provider>
    );
  }
);

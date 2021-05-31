import * as React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { Mode } from "@pages/admin/quiz/type";
import {
  FormProvider,
  UseQuizForm,
  useQuizPaginator,
} from "@service-provider/quiz";
import { observer } from "mobx-react";
import { QuizType } from "@root/models";
import { useParams } from "react-router-dom";

type QuizPageStore = ReturnType<typeof useQuizPaginator> & {
  modeHandler(mode: Mode): void;
  mode: Mode;
  formType: QuizType;
  updateFormType(q: QuizType): void;
};

const Context = React.createContext<QuizPageStore | null>(null);

export function useStore(): QuizPageStore {
  return useContext(Context) as QuizPageStore;
}

export const Provider = observer((props: React.PropsWithChildren<any>) => {
  const [mode, modeHandler] = useState<Mode>("list");
  const [formType, updateFormType] = useState<QuizType>(
    QuizType.MULTIPLE_CHOICE
  );
  const paginator = useQuizPaginator();
  const context: QuizPageStore = {
    ...paginator,
    mode,
    modeHandler,
    formType,
    updateFormType,
  };
  const params = useParams<{ videoId: string }>();

  const onSuccess = () => {
    updateFormType(QuizType.MULTIPLE_CHOICE);
    modeHandler("list");
    paginator.reset();
  };
  const formRef = useRef<UseQuizForm | null>(null);
  useEffect(() => {
    if (mode === "list" && formRef.current) {
      formRef.current?.form.reset({});
    }
  }, [formRef, mode]);

  return (
    <Context.Provider value={context}>
      <FormProvider
        formRef={formRef}
        onSuccess={onSuccess}
        type={formType}
        videoId={params.videoId}
      >
        {props.children}
      </FormProvider>
    </Context.Provider>
  );
});

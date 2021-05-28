import { QuizModelType } from "@root/models";
import { mutationServiceFactory } from "@utils/mutation-service-factory";
import { RootStoreBaseMutations } from "@root-model";
import { useSuccessModal } from "@hooks/use-success-modal";
import { useQuizPaginator } from "./paginator-provider";
import { useEffect } from "react";

const useDelete = mutationServiceFactory({
  mutation: RootStoreBaseMutations.mutateQuizDelete,
  schema: {},
});

type Opt = {
  quiz: QuizModelType | null;
  callback: () => void;
  onLoading(v: boolean): void;
};

export function useDeleteQuiz({ quiz, callback, onLoading }: Opt) {
  const { reset } = useQuizPaginator();
  const { result, loading, resolver } = useDelete({
    injectInput: {
      id: quiz ? quiz.id : "",
    },
  });

  useEffect(() => {
    onLoading(loading);
  }, [loading]);

  useSuccessModal({
    callback() {
      callback();
      reset();
    },
    message: "Quis berhasil di hapus",
    depedencies: Boolean(result),
  });
  const onConfirmed = () => resolver();
  return {
    loading,
    onConfirmed,
  };
}

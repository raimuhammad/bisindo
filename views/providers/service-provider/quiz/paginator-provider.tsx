import { service } from "@services/quiz-service";
import { useParams } from "react-router-dom";
import { QuizModelType } from "@root/models";
import { paginatorFactory } from "../paginator-factory";

const useShouldRender = () => {
  const params = useParams<{ videoId: string }>();
  return Boolean(params.videoId);
};
const useGetInitial = () => {
  const params = useParams<{ videoId: string }>();
  return {
    videoId: params.videoId,
    first: 5,
  };
};

export const {
  Context,
  usePaginatorContext: useQuizPaginator,
  Wrapper,
} = paginatorFactory<QuizModelType>({
  getInitial: useGetInitial,
  getShouldRender: useShouldRender,
  ...service.paginatorOptions,
});

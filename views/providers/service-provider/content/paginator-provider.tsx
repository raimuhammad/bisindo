import { services } from "@services/content-service";
import { useParams } from "react-router-dom";
import { VideoModelType } from "@root/models";
import { paginatorFactory } from "../paginator-factory";

const useGetInitial = () => {
  const params = useParams<{ id: string }>();
  return {
    gradeId: params.id,
  };
};

const useShouldRender = () => {
  const params = useParams<{ id: string }>();
  return Boolean(params.id);
};

export const {
  Context,
  usePaginatorContext: useContentPaginator,
  Wrapper,
  Provider,
} = paginatorFactory<VideoModelType>({
  getInitial: useGetInitial,
  getShouldRender: useShouldRender,
  ...services.paginateOption,
});

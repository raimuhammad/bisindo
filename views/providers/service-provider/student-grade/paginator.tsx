import { service } from "@services/student-services";
import { useParams } from "react-router-dom";
import { StudentGradeModelType } from "@root/models";
import { paginatorFactory, IPaginatorOfType } from "../paginator-factory";

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
  usePaginatorContext: useStudentGradePaginator,
  Wrapper,
  Provider,
} = paginatorFactory<StudentGradeModelType>({
  ...service.paginatorOpt,
  getShouldRender: useShouldRender,
  getInitial: useGetInitial,
});

import { Opt, UsePaginator } from "@hooks/use-paginator";
import { GradeModelSelector, GradeModelType } from "@root/models";
import { RootStoreBaseMutations, RootStoreBaseQueries } from "@root-model";
import { string } from "yup";
import { mutationServiceFactory } from "@utils/mutation-service-factory";

const builder = (a: GradeModelSelector) => {
  return a.id.name.created_at.video_count.student_count;
};

export type P = UsePaginator<
  GradeModelType,
  {
    first?: number;
    search?: string;
  }
>;

const paginateOptions: Opt<{ search: string; first: number }> = {
  modelBuilder: builder,
  initial: { first: 10 },
  queryKey: RootStoreBaseQueries.queryGrades,
};
const schema = {
  name: string().required(),
};

const create = mutationServiceFactory<
  GradeModelType,
  RootStoreBaseMutations.mutateGrade
>({
  schema,
  mutation: RootStoreBaseMutations.mutateGrade,
});
const update = mutationServiceFactory<
  GradeModelType,
  RootStoreBaseMutations.mutateGradeEdit
>({
  schema,
  mutation: RootStoreBaseMutations.mutateGradeEdit,
});

export const services = {
  paginateOptions,
  create,
  update,
};

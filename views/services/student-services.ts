import { ref, string } from "yup";
import { mutationServiceFactory } from "@utils/mutation-service-factory";
import { StudentGradeModelSelector, UserModelType } from "@root/models";
import { RootStoreBaseMutations, RootStoreBaseQueries } from "@root-model";
import { Opt } from "@hooks/use-paginator";

export const emailTest = async (email: any) => {
  return true;
  // return window.rootStore
  //   .queryIsUniqueEmail({ email })
  //   .currentPromise()
  //   .then((data) => {
  //     return data.isUniqueEmail;
  //   })
  //   .catch(() => false);
};

const schema = (isGradeRequired = true) => ({
  email: string().email().required(),
  name: string().required(),
  gradeId: string().when({
    is: () => isGradeRequired,
    then() {
      return string().required();
    },
  }),
});

const withGradeSchema = schema();
const withouthGradeSchema = schema(false);

const create = mutationServiceFactory<
  UserModelType,
  RootStoreBaseMutations.mutateUser
>({
  schema: withGradeSchema,
  mutation: RootStoreBaseMutations.mutateUser,
});

const paginatorOpt: Opt<any> = {
  queryKey: RootStoreBaseQueries.queryStudentGrades,
  initial: {
    first: 10,
  },
  modelBuilder(instance: StudentGradeModelSelector) {
    return instance.id
      .grade((i) => i.id.name)
      .student((i) => i.id.name.active.email);
  },
};

export const service = {
  create,
  paginatorOpt,
  withouthGradeSchema,
  withGradeSchema,
};

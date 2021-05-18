import { mutationServiceFactory } from "utils/mutation-service-factory";
import { string, StringSchema } from "yup";
import { GradeModelType } from "root/models/stores";
import { RootStoreBaseMutations } from "root-model";
/**
 * Pesan error yang di tampilkan
 */
const errorMessages = {
  required: "Nama wajib di isi",
};
const schema = (isRequired = true) => ({
  name: string().when({
    is: isRequired,
    then(schema: StringSchema) {
      return schema.required(errorMessages.required);
    },
  }),
});
const service = (isCreate = true) =>
  mutationServiceFactory<
    GradeModelType,
    RootStoreBaseMutations.mutateGrade | RootStoreBaseMutations.mutateGradeEdit
  >({
    schema: schema(isCreate),
    mutation: isCreate
      ? RootStoreBaseMutations.mutateGrade
      : RootStoreBaseMutations.mutateGradeEdit,
  });

export const gradeService = {
  create: service(),
  update: service(false),
};

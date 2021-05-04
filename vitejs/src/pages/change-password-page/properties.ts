import { resolverFactory } from "utils/resolver-factory";
import * as yup from "yup";
import { RootStoreBaseMutations } from "root-model";
import { factory } from "shared/form-factory";

const resolver = resolverFactory({
  password: yup.string().required().min(6),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Konfirmasi password salah"),
});

const callback = (data: any) => (model: RootModel) =>
  model.mutateUserChangeUserPassword(data);

const resultKey = RootStoreBaseMutations.mutateUserChangeUserPassword;

export const formInstance = factory<boolean>({
  callback,
  resolver,
  resultKey,
});

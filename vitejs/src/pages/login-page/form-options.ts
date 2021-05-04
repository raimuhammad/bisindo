import { factory } from "shared/form-factory";
import { resolverFactory } from "utils/resolver-factory";
import { string } from "yup";
import { RootStoreBaseMutations } from "root-model";

const resolver = resolverFactory({
  email: string().required().email(),
  password: string().required(),
});

const resultKey = RootStoreBaseMutations.mutateLogin;

const callback = (data: any) => (store: RootModel) => {
  return store.mutateLogin(data);
};

export const loginForm = factory<boolean>({
  resolver,
  resultKey,
  callback,
});

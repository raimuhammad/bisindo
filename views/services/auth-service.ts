import { mutationServiceFactory } from "@utils/mutation-service-factory";
import { RootStoreBaseMutations } from "@root-model";
import { ref, string } from "yup";

const sentInvitation = mutationServiceFactory({
  schema: {},
  mutation: RootStoreBaseMutations.mutateSentInvitation,
});
const editUser = mutationServiceFactory({
  schema: {
    name: string().required(),
    email: string().email().required(),
  },
  mutation: RootStoreBaseMutations.mutateUserEdit,
});

const passwordSchema = {
  password: string().required().min(6),
  passwordConfirmation: string()
    .required()
    .oneOf(
      [ref("password")],
      "Konfirmasi password tidak sesuai dengan password"
    ),
};

const activation = mutationServiceFactory({
  schema: passwordSchema,
  mutation: RootStoreBaseMutations.mutateUserActivation,
});
const loginUseInvitation = mutationServiceFactory({
  schema: passwordSchema,
  mutation: RootStoreBaseMutations.mutateLoginWithInvitation,
});

const login = mutationServiceFactory<
  boolean,
  RootStoreBaseMutations.mutateLogin
>({
  schema: {
    email: string().required().email(),
    password: string().required(),
  },
  mutation: RootStoreBaseMutations.mutateLogin,
});

export const service = {
  sentInvitation,
  editUser,
  activation,
  loginUseInvitation,
  login,
};

import {
  Component,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { StoreContext, RootStore, useQuery } from "@model";
import type { RootStoreType } from "@model";
import { GraphQLClient } from "graphql-request";
import { useForm } from "react-hook-form";
import { loginValidator } from "@root/validator/login-validator";

type Props = {
  url: string;
};

const RootStoreContext = createContext<null | RootStoreType>(null);

export const useRootStore = (): RootStoreType => {
  return useContext(RootStoreContext) as RootStoreType;
};

type Callback = (user: AppUser) => void;

export function useAuthFunctions() {
  const root = useRootStore();
  return useCallback(async (callback?: Callback) => {
    const response = await root.queryAuth();
    if (callback && response && response.auth) {
      const { auth } = response;
      return callback({
        id: auth.id,
        name: auth.name as string,
        email: auth.email as string,
        role: auth.role as string,
      });
    }
    if (response && response.auth) {
      const { auth } = response;
      return {
        name: auth.name as string,
        email: auth.email as string,
        role: auth.role as string,
      };
    }
    return null;
  }, []);
}

export function useLoginForm(callback: () => void) {
  const form = useForm({
    resolver: loginValidator,
  });
  const { setQuery, loading, data } = useQuery<{ login: boolean }>();
  const isCredentialInvalid = data && !data.login && !loading;
  useEffect(() => {
    if (data && data.login) {
      callback();
    }
  }, [data]);
  const onSubmit = form.handleSubmit((data: any) => {
    return setQuery((model: RootStoreType) => model.mutateLogin(data));
  });
  return {
    form,
    onSubmit,
    loading,
    isCredentialInvalid,
  };
}

export class ModelProvider extends Component<Props, any> {
  rootStore: RootStoreType;
  constructor(props: any) {
    super(props);
    this.rootStore = RootStore.create(undefined, {
      gqlHttpClient: new GraphQLClient(this.props.url, {
        credentials: "include",
      }),
    });
  }
  render() {
    return (
      <StoreContext.Provider value={this.rootStore}>
        <RootStoreContext.Provider value={this.rootStore}>
          {this.props.children}
        </RootStoreContext.Provider>
      </StoreContext.Provider>
    );
  }
}

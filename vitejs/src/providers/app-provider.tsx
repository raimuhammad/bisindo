import * as React from "react";
import { GraphQLClient } from "graphql-request";
import {
  RootStore,
  RootStoreType,
  StoreContext,
  UserModelType,
} from "root/models/stores";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { LoadingBackdrop } from "components/loading-backdrop";
import { LoginPage } from "pages/login-page";
import { AppStatus, bootApp } from "./app-provider-utils";
import {
  ChangeUserPasswordPage,
  InvitationFail,
} from "pages/change-password-page";
import { ComingSoon } from "components/coming-soon";

type State = {
  app: AppStatus;
  loading: boolean;
};

const endPoint = "/graphql";

const client = new GraphQLClient(endPoint);

type IApp = {
  user: UserModelType | null;
  recheckAuth(): void;
  logout(): void;
};
const Context = React.createContext<null | IApp>(null);

export const useApp = () => {
  return React.useContext(Context) as IApp;
};

export const useUser = () => {
  const context = useApp();
  return context.user;
};

export const rootModel = RootStore.create(undefined, {
  gqlHttpClient: client,
});

@observer
export class AppProvider extends React.Component<any, State> {
  endpoint = "/graphql";

  client: GraphQLClient;

  rootStore: RootStoreType;

  user: null | UserModelType = null;

  componentMap: Record<AppStatus, React.ComponentType>;

  constructor(props: any) {
    super(props);
    this.state = {
      app: AppStatus.INIT,
      loading: true,
    };
    this.client = client;
    this.rootStore = rootModel;
    makeObservable(this, {
      user: observable,
      setUser: action,
    });
    this.componentMap = {
      [AppStatus.INVITATION_SUCCESS]: () => <h1>Application success</h1>,
      [AppStatus.LOGGED_IN]: () => {
        return props.children;
      },
      [AppStatus.CHANGE_USER_PASSWORD]: ChangeUserPasswordPage,
      [AppStatus.INVITATION_FAIL]: InvitationFail,
      [AppStatus.GUEST]: LoginPage,
      [AppStatus.INIT]: React.Fragment,
    };
  }

  setUser = (user: AppProvider["user"]) => {
    this.user = user;
  };

  logout = () => {
    if (this.user) {
      this.setState({ loading: true });
      this.rootStore.mutateLogout().then(() => {
        this.setUser(null);
        this.setState({ loading: false, app: AppStatus.GUEST });
      });
    }
  };

  recheckAuth = () => {
    this.setState({ loading: true });
    bootApp(this.rootStore, false)
      .then(({ user, status }) => {
        if (user) {
          this.setUser(user);
        }
        this.setState({
          app: status,
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  componentDidMount() {
    bootApp(this.rootStore, true).then(({ status, user }) => {
      console.log(status, user);
      if (user) {
        this.setUser(user);
      }
      this.setState({
        app: status,
        loading: false,
      });
    });
  }

  render() {
    const App = this.componentMap[this.state.app];
    return (
      <StoreContext.Provider value={this.rootStore}>
        <Context.Provider
          value={{
            user: this.user,
            recheckAuth: this.recheckAuth,
            logout: this.logout,
          }}
        >
          <LoadingBackdrop loading={this.state.loading} />
          {this.state.loading ? null : <App />}
        </Context.Provider>
      </StoreContext.Provider>
    );
  }
}

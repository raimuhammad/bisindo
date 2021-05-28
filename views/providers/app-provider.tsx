/* eslint-disable */
import * as React from "react";
import { GraphQLClient } from "graphql-request";
import {
  RootStore,
  RootStoreType,
  StoreContext,
  useQuery,
  AppRole as Role,
} from "@model";
import { observer } from "mobx-react";
import { useToggle } from "@hooks/use-toggle";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { VerifiedUser } from "@material-ui/icons";
import { AdminLayout as Layout } from "@layout/admin/component";
import { AppRoutes } from "../app-routes";
import { Route } from "@root/routes/type";
import { routes as AdminRoute } from "../routes/admin";

const rootStore = RootStore.create(undefined, {
  gqlHttpClient: new GraphQLClient("/graphql", {
    credentials: "include",
  }),
});

window.rootStore = rootStore;

type UseApp = Application.AppState & Application.AppAction;

type State = Application.AppState;

const Context = React.createContext<UseApp | null>(null);

export function useApp() {
  return React.useContext(Context) as UseApp;
}

const Dev = observer(() => {
  const { data, setQuery } = useQuery<any>((root) => root.queryAuth());
  const { setUser, user } = useApp();
  const [hover, { force }] = useToggle();

  const doLogin = () =>
    setQuery((store: RootModel) =>
      store.mutateLogin({ email: "imandidikr@gmail.com", password: "password" })
    );
  const qAuth = () => setQuery((store: RootModel) => store.queryAuth());

  React.useEffect(() => {
    if (data && data.login) {
      qAuth();
    }
    if (data && typeof data.auth !== "undefined") {
      setUser(data.auth);
    }
  }, [data]);

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      open={hover}
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
      }}
      onMouseEnter={force(true)}
      onMouseLeave={force(false)}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        onClick={doLogin}
        FabProps={{
          disabled: Boolean(user),
        }}
        tooltipTitle="Login"
        icon={<VerifiedUser />}
      />
    </SpeedDial>
  );
});

export class AppProvider extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      mode: "GUEST",
    };
  }

  updateMode = (mode: State["mode"]) => {
    this.setState({ mode });
  };

  updateUser = (user: State["user"]) => {
    this.setState({
      user,
      loading: false,
      mode: user?.role as Role,
    });
  };

  getContextValue = (): UseApp => ({
    ...this.state,
    setUser: this.updateUser,
  });

  getRoutes = (): Route[] => {
    const { mode, user } = this.state;
    if (user) {
      return AdminRoute;
    }
    return [];
  };

  render() {
    const { loading } = this.state;
    return (
      <Context.Provider value={this.getContextValue()}>
        <StoreContext.Provider value={rootStore}>
          {loading ? null : (
            <Layout>
              <AppRoutes routes={this.getRoutes()} />
            </Layout>
          )}
          <Dev />
        </StoreContext.Provider>
      </Context.Provider>
    );
  }
}

declare global {
  interface Window {
    rootStore: RootStoreType;
  }
}

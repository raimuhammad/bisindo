/* eslint-disable */
import * as React from "react";
import { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";
import {
  AppRole,
  RootStore,
  RootStoreType,
  StoreContext,
  useQuery,
  UserModelType,
} from "@model";
import { observer } from "mobx-react";
import { useToggle } from "@hooks/use-toggle";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { VerifiedUser } from "@mui/icons-material";
import { AdminLayout, GuestLayout, UserLayout } from "@layout/index";
import { AppRoutes } from "../app-routes";
import { routes as AdminRoute } from "../routes/admin";
import { routes as GuestRoute } from "../routes/guest";
import { routes as UserRoute } from "../routes/user";
// @ts-ignore
import emailConfig from "@root/email.json";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { FullPageLoader } from "@components/loaders";
import { LogoutProvider } from "./logout-provider";
import { SoftUiProvider } from "../soft-ui/libs/soft-ui";

export const rootStore = RootStore.create(undefined, {
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

type AppMode = AppRole | "guest";

const LayoutMap: Record<AppMode, any> = {
  guest: GuestLayout,
  [AppRole.ADMIN]: AdminLayout,
  [AppRole.STUDENT]: UserLayout,
};

const Dev = observer(() => {
  const { data, setQuery } = useQuery<any>((root) => root.queryAuth());
  const { setUser, user } = useApp();
  const [hover, { force }] = useToggle();

  const doLogin = () =>
    setQuery((store: RootModel) => store.mutateLogin(emailConfig));
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

const useGetLayoutNode = ({ user, mode }: any) => {
  if (!user) {
    return GuestLayout;
  }
  const { role } = user;
  return LayoutMap[role as AppMode];
};
const useGetRoutes = ({ user, mode }: any) => {
  if (!user) {
    return GuestRoute;
  }
  const map = {
    ADMIN: AdminRoute,
    STUDENT: UserRoute,
  };
  // @ts-ignore
  return map[mode];
};

export const AppProvider = observer(() => {
  const [state, setter] = useState<Omit<State, "loading">>({
    mode: "GUEST",
    user: null,
  });

  const [auth, { fetch, loading }] = useFetchQuery<UserModelType>({
    queryKey: RootStoreBaseQueries.queryAuth,
  });

  const shouldRender = typeof auth !== "undefined" && !loading;

  const [render, { inline }] = useToggle();

  const checkAuth = () =>
    rootStore
      .queryAuth({})
      .currentPromise()
      .then((data) => {
        setter({
          user: data.auth,
          mode: data.auth.role as AppRole,
        });
        inline(true);
      })
      .catch(() => inline(true));

  useEffect(() => {
    checkAuth();
  }, []);

  const Layout = useGetLayoutNode(state);

  const router = useGetRoutes(state);

  const updateMode = (mode: State["mode"]) => {
    return setter({ ...state, mode });
  };

  const updateUser = (user: UserModelType) => {
    if (user) {
      setter({
        ...state,
        user,
        mode: user.role as AppRole,
      });
    } else {
      setter({
        user: null,
        mode: "GUEST",
      });
    }
  };

  const context: UseApp = {
    ...state,
    setUser: updateUser,
    loading,
  };

  const getDefaultRoute = () => {
    if (!state.user) {
      return "/";
    }
    return state.user.role === AppRole.ADMIN ? "/batch" : "/dashboard";
  };
  console.log(state.user);
  return (
    <Context.Provider value={context}>
      <StoreContext.Provider value={rootStore}>
        <LogoutProvider handler={() => setter({ mode: "GUEST", user: null })}>
          {!render ? (
            <FullPageLoader />
          ) : (
            <Layout>
              <SoftUiProvider
                appName="Bisindo"
                uiType={
                  state.user
                    ? state.user.role === "ADMIN"
                      ? "dashboard"
                      : "normal"
                    : "normal"
                }
                routes={router}
                getCurrentRoute={() => false}
                authFunctions={async () => "ready"}
              />
            </Layout>
          )}
          <Dev />
        </LogoutProvider>
      </StoreContext.Provider>
    </Context.Provider>
  );
});

declare global {
  interface Window {
    rootStore: RootStoreType;
  }
}

import "./index.scss";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApplicationProvider } from "@providers/application-provider";
import { Routes as RouterLoader } from "@providers/application-provider/routes";
import { ModelProvider, useRootStore } from "@providers/model-provider";
import { useCallback } from "react";
import { LoginControl } from "@components/dev-component/login-control";
import { Layout } from "./layout";
import { AppRole } from "@root/models";
import { admin, student, guest } from "./pages";
import { SnackbarProvider } from "notistack";
import { LayoutProvider } from "./layout/layout-provider";

const getFallback = (user: AppUser | null) => {
  if (!user) {
    return "/login";
  }
  const { role } = user;
  return role === AppRole.ADMIN ? "classroom" : "/";
};

const Loader = () => {
  const getRoutes = (user: AppUser | null) => {
    if (user) {
      return user.role === AppRole.ADMIN ? admin : student;
    }
    return guest;
  };
  const root = useRootStore();
  const authFunction = useCallback(async (): Promise<AppUser | null> => {
    const response = await root.queryAuth().currentPromise();
    if (response.auth) {
      const { auth } = response;
      return {
        id: auth.id as string,
        name: auth.name as string,
        email: auth.email as string,
        role: auth.role as string,
      };
    }
    return null;
  }, []);
  return (
    <ApplicationProvider getRoutes={getRoutes} authFunctions={authFunction}>
      <LayoutProvider>
        <Layout>
          <RouterLoader getFallback={getFallback} />
        </Layout>
      </LayoutProvider>
      <LoginControl />
    </ApplicationProvider>
  );
};

const root = document.getElementById("root");

if (root) {
  render(
    <BrowserRouter>
      <SnackbarProvider
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
      >
        <ModelProvider
          url={(import.meta.env.VITE_BACKEND as string) + "/graphql"}
        >
          <Loader />
        </ModelProvider>
      </SnackbarProvider>
    </BrowserRouter>,
    root
  );
}

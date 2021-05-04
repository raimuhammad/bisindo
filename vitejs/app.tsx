import * as React from "react";
import { AppProvider } from "providers/app-provider";
import { Layout } from "root/layout/layout";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./routing";
import { SnackbarProvider } from "notistack";

export const App = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <AppProvider>
          <Layout>
            <Routing />
          </Layout>
        </AppProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

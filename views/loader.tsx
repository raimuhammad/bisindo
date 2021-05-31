import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppProvider as App } from "./providers/app-provider";
import * as AppTheme from "./layout/app-theme";
import { SnackbarProvider } from "notistack";
import "./app.scss";
import { FullPageLoader } from "@components/loaders";

render(
  <BrowserRouter>
    <AppTheme.Theme>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </AppTheme.Theme>
  </BrowserRouter>,
  document.getElementById("root")
);

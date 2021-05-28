import * as React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import themeConfig from "./theme.json";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const appTheme = createMuiTheme(themeConfig);

export const Theme = ({ children }: any) => {
  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
};

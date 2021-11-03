import { PureComponent } from "react";
import { reducer, initialState, Actions } from "./reducer";
import { Context, ISoftUi, Props } from "./context";
import {
  StyledEngineProvider,
  ThemeProvider,
  Theme,
} from "@mui/material/styles";
import { jssPreset, StylesProvider } from "@mui/styles";
import { CssBaseline } from "@mui/material";
import { create } from "jss";
import rtl from "jss-rtl";
import theme from "assets/theme";
import { Progress } from "./progress";
import { DashboardProvider as DashboardLayout } from "../dashboard";
import { NormalLayout } from "../normal";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

export class SoftUiProvider extends PureComponent<
  Props,
  ReturnType<typeof reducer>
> {
  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  reducer = (action: Actions) => {
    this.setState(reducer(this.state, action));
  };

  get contextValue(): ISoftUi {
    const { appLogo = "", appName = "", user = null } = this.props;
    return [
      {
        ...this.state,
        customPageCallback: this.customTitleCallback,
        appLogo,
        appName,
        user: user ?? this.state.user,
      },
      this.reducer,
    ];
  }

  componentDidMount() {
    const { uiType, authFunctions } = this.props;

    if (uiType === "dashboard" && !authFunctions) {
      throw new Error(
        "Please provide authFunctions when using dashboard layout"
      );
    }

    authFunctions &&
      authFunctions().then((status) => {
        this.setState((state) => ({
          ...state,
          status,
          layout: this.props.uiType,
        }));
      });
  }

  customTitleCallback = (value: string) => {
    if (!value) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }
    this.reducer({
      type: "CUSTOM_TITLE",
      value,
    });
    return () => {
      this.reducer({
        type: "CUSTOM_TITLE",
        value: "",
      });
    };
  };

  Layout = () => {
    if (this.props.uiType === "dashboard") {
      return DashboardLayout;
    }
    return NormalLayout;
  };

  render() {
    const LayoutProvider = this.Layout();
    return (
      <StylesProvider jss={jss}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Context.Provider value={this.contextValue}>
              <CssBaseline />
              {this.state.status !== "ready" ? (
                <Progress appName={this.props.appName} />
              ) : (
                <LayoutProvider
                  getCurrentRoute={this.props.getCurrentRoute}
                  routes={this.props.routes}
                >
                  {this.props.children}
                </LayoutProvider>
              )}
            </Context.Provider>
          </ThemeProvider>
        </StyledEngineProvider>
      </StylesProvider>
    );
  }
}

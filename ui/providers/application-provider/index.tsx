import { Component } from "react";
import type { ProviderState, IApp, ProviderProps } from "./types";
import { AppContext } from "./context";

export { useApp } from "./context";

export class ApplicationProvider extends Component<
  ProviderProps,
  ProviderState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      routes: [],
      user: null,
      initilizing: true,
    };
  }

  setUser = (user: AppUser) => {
    this.setState((current) => {
      return {
        ...current,
        user,
        routes: [...this.props.getRoutes(user)],
      };
    });
  };

  componentDidMount() {
    const { authFunctions, getRoutes } = this.props;
    authFunctions().then((user) => {
      this.setState({
        initilizing: false,
        routes: getRoutes(user),
        user,
      });
    });
  }

  getContext = (): IApp => ({
    ...this.state,
    setUser: this.setUser,
  });

  render() {
    return (
      <AppContext.Provider value={this.getContext()}>
        {this.state.initilizing ? "Initializing" : this.props.children}
      </AppContext.Provider>
    );
  }
}

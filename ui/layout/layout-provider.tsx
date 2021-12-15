// @flow
import * as React from "react";
import { createContext, useContext } from "react";

type Nav = {
  path: string;
  label: string;
};

type BackUrl = {
  url: string;
  label: string;
};
type State = {
  navs: Nav[];
  backurl: BackUrl | null;
};
interface Actions {
  updateNavs(navs: Nav[]): void;
  updateBackUrl(backurl?: null | BackUrl): void;
}
type UseLayout = State & Actions;
const LayoutContext = createContext<UseLayout | null>(null);
export const useLayout = () => useContext(LayoutContext) as UseLayout;
export class LayoutProvider extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      navs: [],
      backurl: null,
    };
  }
  updateNav = (navs: Nav[]) => {
    this.setState({
      navs: [...navs],
    });
  };
  updateBackUrl = (backurl: BackUrl | null = null) => {
    this.setState({
      backurl,
    });
  };
  getContextValue = (): UseLayout => ({
    ...this.state,
    updateNavs: this.updateNav,
    updateBackUrl: this.updateBackUrl,
  });
  render() {
    return (
      <LayoutContext.Provider value={this.getContextValue()}>
        {this.props.children}
      </LayoutContext.Provider>
    );
  }
}

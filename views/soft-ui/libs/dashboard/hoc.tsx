import {
  createContext,
  PropsWithChildren,
  PureComponent,
  useContext,
} from "react";
import { DashboardProps } from "./type";
import { Sidenav } from "../components/sidenav";
import { Header } from "../components/header";
import { useSoftUi } from "../soft-ui";
import { ContentContainer } from "./content-container";
import { Route, Switch } from "react-router-dom";

type UseDashboard = {
  softUi: ReturnType<typeof useSoftUi>[0];
  softUiDispatcher: ReturnType<typeof useSoftUi>[1];
  routes: RouteDefinition[];
  onScroll(e: MouseEvent): void;
  shrinkNavBar(): void;
  expandNavBar(): void;
};

const Context = createContext<UseDashboard | null>(null);

export function useDashboard(): UseDashboard {
  return useContext(Context) as UseDashboard;
}

type HocProps = DashboardProps & {
  softUi: ReturnType<typeof useSoftUi>[0];
  dispatcher: ReturnType<typeof useSoftUi>[1];
};

class Hoc extends PureComponent<HocProps, any> {
  shrinkNavbar = () => {
    const { dispatcher } = this.props;
    dispatcher({
      value: true,
      type: "MINI_SIDENAV",
    });
  };
  expandNavbar = () => {
    const { dispatcher } = this.props;
    dispatcher({
      value: false,
      type: "MINI_SIDENAV",
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.expandNavbar);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.expandNavbar);
  }

  getContextValue = (): UseDashboard => {
    const { softUi, dispatcher: softUiDispatcher } = this.props;
    return {
      softUi,
      softUiDispatcher,
      routes: this.props.routes,
      onScroll: this.onContentScroll,
      shrinkNavBar: this.shrinkNavbar,
      expandNavBar: this.expandNavbar,
    };
  };

  onContentScroll = (e: any) => {
    const { transparentNavbar } = this.props.softUi;
    const dispatcher = this.props.dispatcher;
    const isTop = e.target.scrollTop === 0;
    if (!transparentNavbar && isTop) {
      return dispatcher({
        type: "TRANSPARENT_NAVBAR",
        value: true,
      });
    }
    dispatcher({
      type: "TRANSPARENT_NAVBAR",
      value: false,
    });
  };

  render() {
    const {
      miniSidenav: isMiniSideNav,
      transparentSidenav: isTransparent,
    } = this.props.softUi;
    return (
      <Context.Provider value={this.getContextValue()}>
        <div style={{ display: "flex" }}>
          <>
            <Sidenav
              getCurrentRoute={this.props.getCurrentRoute}
              routes={this.props.routes}
              mini={isMiniSideNav}
              transparent={isTransparent}
              handleClose={this.shrinkNavbar}
            />
          </>
          <ContentContainer>
            <Header />
            <Switch>
              {this.props.routes.map((item) => {
                return <Route {...item} />;
              })}
            </Switch>
          </ContentContainer>
        </div>
      </Context.Provider>
    );
  }
}

export const Provider = ({
  children,
  ...props
}: PropsWithChildren<DashboardProps>) => {
  const softUi = useSoftUi();
  return (
    <Hoc {...props} softUi={softUi[0]} dispatcher={softUi[1]}>
      {children}
    </Hoc>
  );
};

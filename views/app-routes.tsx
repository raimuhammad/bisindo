import * as React from "react";
import { Route } from "./routes/type";
import { Route as DomRoute, Switch, Redirect } from "react-router-dom";
import "@vime/core/themes/default.css";
import "@vime/core/themes/light.css";

type Props = {
  routes: Route[];
  defaultRoute: string;
};
export const AppRoutes = ({ routes, defaultRoute }: Props) => {
  return (
    <Switch>
      {routes.map(({ component, path }) => (
        <DomRoute exact component={component} path={path} key={path} />
      ))}
      <DomRoute
        exact
        path="/"
        component={() => <Redirect to={defaultRoute} />}
      />
      <DomRoute path="*" component={() => <Redirect to="/" />} />
    </Switch>
  );
};

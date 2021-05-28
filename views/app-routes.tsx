import * as React from "react";
import { Route } from "./routes/type";
import { Route as DomRoute, Switch, Redirect } from "react-router-dom";

type Props = {
  routes: Route[];
};
export const AppRoutes = ({ routes }: Props) => {
  return (
    <Switch>
      {routes.map(({ component, path }) => (
        <DomRoute exact component={component} path={path} key={path} />
      ))}
      <DomRoute exact path="/" component={() => <h1>Home</h1>} />
      <DomRoute path="*" component={() => <Redirect to="/" />} />
    </Switch>
  );
};

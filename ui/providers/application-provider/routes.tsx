import { Switch, Route, Redirect } from "react-router-dom";
import { useApp } from ".";

type RoutesProps = {
  getFallback(user: AppUser | null): string;
};

export const Routes = ({ getFallback }: RoutesProps) => {
  const { routes, user } = useApp();
  const fallback = getFallback(user);
  const checkIsExists = routes.find((item) => item.path === fallback);

  if (!checkIsExists) {
    throw new Error(`Path ${fallback} is not exist in routes`);
  }

  return (
    <Switch>
      {routes.map((item) => (
        <Route
          exact
          key={item.path}
          component={item.component}
          path={item.path}
        />
      ))}
      <Route path="/">
        <Redirect to={fallback} />
      </Route>
    </Switch>
  );
};

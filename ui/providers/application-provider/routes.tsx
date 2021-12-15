import { Route, Routes as AppRouter } from "react-router-dom";
import { useApp } from ".";
import { AnimatedPage } from "@components/animated-page";

type RoutesProps = {
  getFallback(user: AppUser | null): string;
};

export const Routes = ({ getFallback }: RoutesProps) => {
  const { routes, user } = useApp();
  const fallback = getFallback(user);
  const checkIsExists = routes.find(
    (item) => item.path.replaceAll("/*", "") === fallback
  );
  if (!checkIsExists) {
    throw new Error(`Path ${fallback} is not exist in routes`);
  }
  return (
    <AppRouter>
      {routes.map(({ path, component: ParentComponent, groups }) => {
        const childrens = groups ?? [];
        return (
          <Route
            key={path}
            path={path}
            element={
              <AnimatedPage>
                <ParentComponent />
              </AnimatedPage>
            }
          >
            {childrens.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <AnimatedPage>
                    <Component />
                  </AnimatedPage>
                }
              />
            ))}
          </Route>
        );
      })}
    </AppRouter>
  );
};

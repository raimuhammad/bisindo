export type DashboardProps = {
  getCurrentRoute(route: RouteDefinition): boolean;
  routes: RouteDefinition[];
};

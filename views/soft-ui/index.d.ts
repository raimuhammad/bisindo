type RouteDefinition = {
  type: string;
  name: string;
  key: string;
  route: string;
  icon: import("react").ReactNode;
  noCollapse: boolean;
  component: import("react").ComponentType<any>;
  hideInMenu?: boolean
};

type AppUser = {
  email: string;
  name: string;
  role?: string;
};

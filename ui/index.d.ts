interface BaseRoutes {
  component: import("react").ComponentType<any>;
  name: string;
  path: string;
}

interface RouteDefinition extends BaseRoutes {
  key: string;
  icon: import("react").ComponentType<any>;
  component: import("react").ComponentType<any>;
  groups?: BaseRoutes[];
  hideInMenu?: boolean;
}

interface AppUser {
  role?: string;
  name: string;
  email: string;
}

interface App {
  name: string;
  logo: string;
  url: string;
}

interface AppProps {
  authFunctions(): Promise<AppUser | null>;
  getRoutes(user?: AppUser): RouteDefinition[];
}

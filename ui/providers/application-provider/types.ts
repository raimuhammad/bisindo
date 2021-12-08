export type AppStates = {
  routes: RouteDefinition[];
  user: AppUser | null;
};

export type ProviderProps = {
  getRoutes(user: AppUser| null): RouteDefinition[];
  authFunctions(): Promise<AppUser | null>;
};

export interface ProviderState extends AppStates {
  initilizing: boolean;
}

export interface IApp extends ProviderState {
  setUser(user: AppUser| null): void;
}

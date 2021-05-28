declare namespace Application {
  type AppMode = "ADMIN" | "STUDENT" | "GUEST";
  type AppUser = import("./models").UserModelType;
  interface AppState {
    user: AppUser | null;
    mode: AppMode;
    loading: boolean;
  }
  interface AppAction {
    setUser(user: AppUser | null): void;
  }
  type PaginatorConst = typeof import("./app").paginator;

  type PaginatorInput<
    T extends Record<string, any> = Record<string, any>
  > = Record<PaginatorConst["defaultInput"], number> & T;
}
type RootModel = import("./models").RootStoreType;
type BatchPaginator = import("./services/batch-service").P;
type VideoPaginator = import("./services/content-service").P;

type UseBatchPage = import("./components/preload-page").PreloadComponentProp<
  import("./models").GradeModelType
>;

import { observer } from "mobx-react";
import { Opt, UsePaginator, usePaginator } from "@hooks/use-paginator";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Options = {
  getInitial(): Record<string, any>;
  getShouldRender?(): boolean;
} & Omit<Opt<any>, "initial">;

type IpaginatorContext<T> = UsePaginator<T> & {
  setSelected(m: T): void;
  selected: T | null;
};

export function paginatorFactory<T extends Record<string | "id", any>>({
  getInitial,
  queryKey,
  modelBuilder,
  getShouldRender,
}: Options) {
  const Context = createContext<IpaginatorContext<T> | null>(null);
  const usePaginatorContext = (): IpaginatorContext<T> =>
    useContext(Context) as IpaginatorContext<T>;
  const Provider = observer(({ children }: React.PropsWithChildren<any>) => {
    const initial = getInitial();
    const [id, setId] = useState<string>("");
    const paginator = usePaginator({
      initial,
      queryKey,
      modelBuilder,
    }) as UsePaginator<T>;

    const setSelected = useCallback(({ id: selectedId }: T) => {
      const isSameId = id === selectedId;
      setId(id && isSameId ? "" : selectedId);
    }, []);

    useEffect(() => {
      if (paginator.data.length) {
        setSelected(paginator.data[0]);
      }
    }, [paginator.data]);

    const getSelected = useCallback((): null | T => {
      const f = paginator.data.find((item) => item.id === id);
      return f ?? null;
    }, [paginator.data, id]);

    const context: IpaginatorContext<T> = {
      ...paginator,
      selected: getSelected(),
      setSelected,
    };
    const shouldRender = getShouldRender ? getShouldRender() : true;
    return (
      <Context.Provider value={context}>
        {shouldRender ? children : null}
      </Context.Provider>
    );
  });
  const Wrapper = (Com: React.ComponentType<any>) => {
    const ContentPaginatorProvider = observer(() => {
      return (
        <Provider>
          <Com />
        </Provider>
      );
    });
    return ContentPaginatorProvider;
  };
  return {
    Provider,
    usePaginatorContext,
    Context,
    Wrapper,
  };
}

export interface IPaginatorOfType<T>
  extends Omit<ReturnType<typeof paginatorFactory>, "usePaginatorContext"> {
  usePaginatorContext(): IpaginatorContext<T>;
}

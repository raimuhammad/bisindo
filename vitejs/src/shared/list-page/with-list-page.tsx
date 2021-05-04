import { storeFactory } from "./stores";
import React, { createContext, useEffect } from "react";
import { RootStoreType, useQuery } from "root/models/stores";
import { RootStoreBaseQueries } from "root-model";
import voca from "voca";
import { IModelType } from "mobx-state-tree";
import { observer, Observer } from "mobx-react";
import { ObservableMap } from "mobx";

export type ListPageProps<T extends IModelType<any, any>> = {
  attach(v: T["Type"]): void;
  detach(): void;
  selected: null | T["Type"];
  items: Array<T["Type"]>;
  loading: boolean;
  loadData(vars: Record<string, any>): void;
};

export type PageProps<T> = {
  attach(v: T): void;
  detach(): void;
  selected: null | T;
  items: Array<T>;
  loading: boolean;
};

export type WithListPageProp<T extends IModelType<any, any>, P> = {
  pageProps: P;
} & ListPageProps<T>;

type WithListPageOption<T extends IModelType<any, any>, P = any> = {
  queryKey: RootStoreBaseQueries;
  component: React.ComponentType<WithListPageProp<T, P>>;
  initialVar?: Record<string, any>;
  subType: T;
  subTypeKey: keyof RootStoreType;
  disableAutoFetch?: boolean;
};

export const Context = createContext<null | PageProps<any>>(null);

export function withListPage<T extends IModelType<any, any>, P = any>(
  Options: WithListPageOption<T>
) {
  const {
    queryKey,
    initialVar,
    subType,
    subTypeKey,
    disableAutoFetch,
  } = Options;
  const resKey = voca(queryKey).replace("query", "").decapitalize().value();
  type Ref = {
    [k in typeof resKey]: ObservableMap<string, T>;
  };
  const store = storeFactory(subType, subTypeKey);
  const Page = (props: P) => {
    const fetch = (variables: any) => (store: RootModel) => {
      return store[queryKey](variables);
    };
    const { loading, data, setQuery } = useQuery<Ref>();

    const loadData = (vars: Record<string, any> = {}) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return setQuery(fetch(vars));
    };

    useEffect(() => {
      if (!disableAutoFetch) {
        loadData(initialVar);
      }
    }, []);

    const getData = React.useCallback(() => {
      return data && data[resKey]
        ? ((data[resKey] as unknown) as Array<T>)
        : [];
    }, [data]);

    const componentProps: ListPageProps<T> = {
      items: getData(),
      selected: store.selected,
      attach: store.attach,
      detach: store.detach,
      loading,
      loadData,
    };
    return (
      <Context.Provider value={componentProps}>
        <Options.component pageProps={props as P} {...componentProps} />
      </Context.Provider>
    );
  };
  return observer(Page);
}

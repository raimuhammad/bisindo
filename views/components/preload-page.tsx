import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { RootStoreBaseQueries } from "@root-model";
import voca from "voca";
import { useQuery } from "@models/index";
import { useRouteMatch } from "react-router-dom";
import { observer } from "mobx-react";

type Props = {
  root: RootModel;
  routeProp: RouteComponentProps;
  queryKey: RootStoreBaseQueries;
  identifier: string;
};
export type PreloadPageProp = {
  queryKey: Props["queryKey"];
  identifier?: string;
};
export type PreloadComponentProp<T> = {
  model: T;
  refetch: () => void;
};

const Context = React.createContext<null | PreloadComponentProp<any>>(null);

export function usePreloadPage<T>() {
  return React.useContext(Context) as PreloadComponentProp<T>;
}

export function preloadPageFactory<T>(
  { queryKey, identifier = "id" }: PreloadPageProp,
  Component: React.ComponentType<PreloadComponentProp<T>>
) {
  const Node = observer(() => {
    const [model, setModel] = React.useState<null | T>(null);
    const { data, setQuery } = useQuery<any>();
    const resultKey = voca(queryKey)
      .replaceAll("query", "")
      .camelCase()
      .value();
    const { params } = useRouteMatch<any>();
    const fetch = () => {
      const variables = {
        [identifier]: params[identifier],
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setQuery((root: RootModel) => root[queryKey](variables));
    };
    React.useEffect(() => {
      if (data && data[resultKey]) {
        setModel(data[resultKey]);
      }
    }, [data]);
    React.useEffect(() => {
      fetch();
    }, []);
    return !model ? null : (
      <Context.Provider value={{ model, refetch: fetch }}>
        <Component model={model} refetch={fetch} />
      </Context.Provider>
    );
  });
  return Node;
}

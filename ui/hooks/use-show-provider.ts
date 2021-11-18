import type { RootStoreBaseQueries } from "@root-model";
import { useQuery } from "@root/models";
import { parseMutationQuerykey } from "@providers/model-provider/utils";

export type Options<T = any> = {
  provider?: (v: UseShowProvider<Base<any>>) => T;
  api: RootStoreBaseQueries;
  id: string;
};

export function useShowProvider<T, Values = {}>({
  api,
  provider,
  id,
}: Options): UseShowProvider<T, Values> {
  const result = parseMutationQuerykey(api);
  const apiCallback = (root: any) => root[api]({ id });
  const { loading, error, setQuery, data } = useQuery<any>(apiCallback);
  const refreshModel = () => setQuery(apiCallback);
  const common = {
    refreshModel,
    pageLoading: loading,
    error: Boolean(error),
    modelId: id,
    model: (data ? data[result] : null) as T,
    hasResponse: Boolean(data && data[result]),
  };
  const providerValues = () => {
    if (provider) {
      return provider(common as Base<any>);
    }
    return {} as Values;
  };
  return {
    ...providerValues(),
    refreshModel,
    pageLoading: loading,
    error: Boolean(error),
    modelId: id,
    model: (data ? data[result] : null) as T,
    hasResponse: Boolean(data && data[result]),
  };
}
interface Base<T> {
  refreshModel(): void;
  pageLoading: boolean;
  error: boolean;
  modelId: string;
  model: T;
  hasResponse: boolean;
}
export type UseShowProvider<T, V = {}> = Base<T> & V;

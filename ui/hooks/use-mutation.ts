import type { RootStoreBaseMutations } from "@root-model";
import { useQuery } from "@root/models";
import { parseMutationQuerykey } from "@providers/model-provider/utils";

type Options = {
  api: RootStoreBaseMutations;
  merge?: Record<string, any>;
  parser?(data: any): any;
};

type UseMutation<T> = [
  {
    loading: boolean;
    response: null | T;
  },
  (v: Record<string, any>) => void
];

export function useMutation<T = any>({
  api,
  merge = {},
  parser,
}: Options): UseMutation<T> {
  const { data, loading, error, setQuery } = useQuery<any>();
  const resultKey = parseMutationQuerykey(api);
  const handler = (data: Record<string, any>) => {
    if (parser) {
      data = { ...parser(data) };
    }
    return setQuery((root: any) => root[api]({ ...data, ...merge }));
  };
  return [
    {
      loading,
      response: data ? data[resultKey] : null,
    },
    handler,
  ];
}

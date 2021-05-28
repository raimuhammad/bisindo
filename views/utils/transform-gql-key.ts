import { RootStoreBaseMutations, RootStoreBaseQueries } from "@root-model";
import voca from "voca";

export function transformGqlKey(
  key: RootStoreBaseQueries | RootStoreBaseMutations
) {
  return voca(key)
    .replaceAll("mutation", "")
    .replaceAll("query", "")
    .camelCase();
}

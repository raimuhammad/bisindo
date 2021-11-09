import voca from "voca";

export function parseMutationQuerykey(api: any): string {
  return voca(api)
    .replaceAll("query", "")
    .replaceAll("mutate", "")
    .camelCase()
    .value();
}

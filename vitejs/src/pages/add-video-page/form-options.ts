/**
 * File ini untuk mengatur konfigurasi upload video
 * pesan yang di tampilkan & operasi graphql,
 */
import { resolverFactory } from "utils/resolver-factory";
import { mixed, string } from "yup";
import { RawDraftContentState } from "draft-js";
import voca from "voca";
import { RootStoreBaseMutations } from "root-model";

const callback = (data: any) => {
  return (store: RootModel) => {
    data.description = JSON.stringify(data.description);
    return store.mutateVideo({ args: data });
  };
};
const resolver = resolverFactory({
  title: string().required(),
  caption: string().required(),
  description: mixed().test(
    "validate-blocks-text",
    "Silahkan isi deskripsi",
    (value: RawDraftContentState) => {
      if (!value) return false;
      const blocktexts = value.blocks.reduce((item, reducer) => {
        return item + reducer.text;
      }, "");
      return Boolean(voca(blocktexts).trim().value().length);
    }
  ),
  content: mixed().test(
    "is-file-exists",
    "Silahkan pilih file terlebih dahulu",
    (value) => {
      return value instanceof File;
    }
  ),
});
const resultKey = RootStoreBaseMutations.mutateVideo;
export default {
  resultKey,
  callback,
  resolver,
};

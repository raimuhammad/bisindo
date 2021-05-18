import { mutationServiceFactory } from "utils/mutation-service-factory";
import { VideoModelType } from "root/models/stores";
import { RootStoreBaseMutations } from "root-model";
import { mixed, string } from "yup";
import { RawDraftContentState } from "draft-js";
import voca from "voca";

export const useDeleteVideo = mutationServiceFactory<
  VideoModelType,
  RootStoreBaseMutations.mutateVideoDelete
>({
  schema: {},
  mutation: RootStoreBaseMutations.mutateVideoDelete,
});

const parseJson = (value: any): Record<string, any> => {
  const obj = JSON.parse(value);
  if (typeof obj !== "object") {
    return parseJson(obj);
  }
  return obj;
};

export const useUpdateVideo = mutationServiceFactory<
  VideoModelType,
  RootStoreBaseMutations.mutateVideoUpdate
>({
  schema: {
    title: string().required(),
    caption: string().required(),
    description: mixed()
      .test(
        "validate-blocks-text",
        "Silahkan isi deskripsi",
        (value: string) => {
          if (!value) return false;
          const obj = parseJson(value) as RawDraftContentState;
          console.log(obj);
          const blocktexts = obj.blocks.reduce((item, reducer) => {
            return item + reducer.text;
          }, "");
          return Boolean(voca(blocktexts).trim().value().length);
        }
      )
      .transform((v) => {
        if (typeof v === "object") {
          return JSON.stringify(v);
        }
        return v;
      }),
  },
  mutation: RootStoreBaseMutations.mutateVideoUpdate,
});

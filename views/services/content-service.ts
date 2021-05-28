import { mixed, string } from "yup";
import { RawDraftContentState } from "draft-js";
import voca from "voca";
import { Opt, UsePaginator } from "@hooks/use-paginator";
import { VideoModelSelector, VideoModelType } from "@model";
import { RootStoreBaseMutations, RootStoreBaseQueries } from "@root-model";
import { mutationServiceFactory } from "@utils/mutation-service-factory";

type Arg = {
  search: string;
  first: number;
  gradeId: string;
};
const parseJson = (value: any): Record<string, any> => {
  const obj = JSON.parse(value);
  if (typeof obj !== "object") {
    return parseJson(obj);
  }
  return obj;
};
export type P = UsePaginator<VideoModelType, Arg>;
export const draftJsSchema = mixed().test(
  "validate-blocks-text",
  "Silahkan isi deskripsi",
  (value: RawDraftContentState) => {
    if (!value) return false;
    console.log("VALUE: ", value);
    const blocktexts = value.blocks.reduce((item: any, reducer: any) => {
      return item + reducer.text;
    }, "");
    return Boolean(voca(blocktexts).trim().value().length);
  }
);
const schema = (isRequired = true) => ({
  title: string().required(),
  caption: string().required(),
  description: draftJsSchema.required(),
  content: mixed().when({
    is: isRequired,
    then(schema: any) {
      return schema.test(
        "is-file-exists",
        "Silahkan pilih file terlebih dahulu",
        (value: any) => {
          return value instanceof File;
        }
      );
    },
  }),
});

const factory = (create = true) => {
  const key = create
    ? RootStoreBaseMutations.mutateVideo
    : RootStoreBaseMutations.mutateVideoUpdate;
  return mutationServiceFactory<VideoModelType, typeof key>({
    mutation: key,
    schema: schema(create),
  });
};

const create = factory(true);
const update = factory(false);

const builder = (instance: VideoModelSelector) => {
  return instance.id.caption.title.content.grade((i) => i.name).duration
    .thumbnail.description;
};

const paginateOption: Omit<Opt<Arg>, "initial"> = {
  queryKey: RootStoreBaseQueries.queryVideos,
  modelBuilder: builder,
};

export const services = {
  paginateOption,
  create,
  update,
  destroy: mutationServiceFactory<
    VideoModelType,
    RootStoreBaseMutations.mutateVideoDelete
  >({
    schema: {},
    mutation: RootStoreBaseMutations.mutateVideoDelete,
  }),
  schema,
};

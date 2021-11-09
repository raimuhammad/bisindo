import type { IFormMutationOf } from "./form-mutation";
import { formMutationfactory } from "./form-mutation";
import { RootStoreBaseMutations } from "@root-model";
import { batchValidator } from "@root/validator/batch-validator";
import { createContext, useContext } from "react";
import { observer } from "mobx-react";
import {videoValidator} from "@root/validator/video-validator";

import type { PropsWithChildren } from "react";
import type { GradeModelType, VideoModelType } from "@root/models";


export const mutations = {
  createBatch: formMutationfactory<GradeModelType>({
    api: RootStoreBaseMutations.mutateGrade,
    rule: batchValidator,
  }),
  editBatch: formMutationfactory<GradeModelType>({
    api: RootStoreBaseMutations.mutateGrade,
    rule: batchValidator,
  }),
  addVideo: formMutationfactory<VideoModelType>({
    api: RootStoreBaseMutations.mutateVideo,
    rule: videoValidator,
  }),
};

type Props = PropsWithChildren<{
  mutateKey: keyof typeof mutations;
  merge?: Record<string, any>;
  parser?:(v: any)=>any
}>;

const MutationContext = createContext<null | IFormMutationOf<any>>(null);

export function useMutationForm<T>(): IFormMutationOf<T> {
  return useContext(MutationContext) as IFormMutationOf<T>;
}

export const MutationFormProvider = observer(
  ({ mutateKey, merge = {}, parser,children }: PropsWithChildren<Props>) => {
    const callback = mutations[mutateKey];
    if (!callback) {
      throw new Error(`Please implemented mutation ${mutateKey}`);
    }
    const contextValue = callback(merge, parser);
    return (
      <MutationContext.Provider value={contextValue}>
        {children}
      </MutationContext.Provider>
    );
  }
);

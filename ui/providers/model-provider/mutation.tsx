import type { IFormMutationOf } from "./form-mutation";
import { formMutationfactory } from "./form-mutation";
import { RootStoreBaseMutations } from "@root-model";
import { batchValidator } from "@root/validator/batch-validator";
import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import { observer } from "mobx-react";
import {
  videoUpdateValidator,
  videoValidator,
} from "@root/validator/video-validator";
import type {
  DiscussionModelType,
  GradeModelType,
  UserModelType,
  VideoModelType,
} from "@root/models";
import {
  userValidator,
  activationValidator,
} from "@root/validator/user-validator";
import { discussionContentValidator } from "@root/validator/discussion-validator";

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
  addUser: formMutationfactory<VideoModelType>({
    api: RootStoreBaseMutations.mutateUser,
    rule: userValidator,
  }),
  addDiscussion: formMutationfactory<DiscussionModelType>({
    api: RootStoreBaseMutations.mutateDiscussion,
    rule: discussionContentValidator,
  }),
  editDiscussion: formMutationfactory<DiscussionModelType>({
    api: RootStoreBaseMutations.mutateUpdateDiscussion,
    rule: discussionContentValidator,
  }),
  addDiscussionReply: formMutationfactory<DiscussionModelType>({
    api: RootStoreBaseMutations.mutateDiscussionReply,
    rule: discussionContentValidator,
  }),
  editDiscussionReply: formMutationfactory<DiscussionModelType>({
    api: RootStoreBaseMutations.mutateUpdateDiscussionReply,
    rule: discussionContentValidator,
  }),
  editVideo: formMutationfactory<VideoModelType>({
    api: RootStoreBaseMutations.mutateVideoUpdate,
    rule: videoUpdateValidator,
  }),
  activation: formMutationfactory<UserModelType>({
    api: RootStoreBaseMutations.mutateUserActivation,
    rule: activationValidator,
  }),
  editUser: formMutationfactory<UserModelType>({
    api: RootStoreBaseMutations.mutateUserEdit,
    rule: userValidator,
  }),
};

export type KeyOfMutation = keyof typeof mutations;

type Props = PropsWithChildren<{
  mutateKey: keyof typeof mutations;
  merge?: Record<string, any>;
  parser?: (v: any) => any;
}>;

const MutationContext = createContext<null | IFormMutationOf<any>>(null);

export function useMutationForm<T>(): IFormMutationOf<T> {
  return useContext(MutationContext) as IFormMutationOf<T>;
}

export const MutationFormProvider = observer(
  ({ mutateKey, merge = {}, parser, children }: PropsWithChildren<Props>) => {
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

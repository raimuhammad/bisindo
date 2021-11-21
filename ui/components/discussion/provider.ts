import { createContext, useCallback, useContext, useState } from "react";
import { useApp } from "@providers/application-provider";
import type {
  DiscussionModelType,
  DiscussionReplyModelType,
} from "@root/models";

export type FormMode = "edit" | "create" | "editReply" | "addReply";

export function useDiscussionProvider(gradeId: string) {
  const { user } = useApp();
  const [formMode, setFormMode] = useState<
    null | "edit" | "create" | "editReply" | "addReply"
  >(null);
  const enableCrud = useCallback(
    (model: DiscussionModelType | DiscussionReplyModelType) => {
      return user?.id === model.user_id;
    },
    [user]
  );
  const [selected, setSelected] = useState<
    null | DiscussionModelType | DiscussionReplyModelType
  >(null);

  const getInitialContent = () => {
    if ( selected && (formMode === "edit" || formMode === "editReply") ){
      return selected.content
    }
    return null;
  }

  return {
    enableCrud,
    setFormMode,
    formMode,
    gradeId,
    userId: user?.id as string,
    setSelected,
    initialContent: getInitialContent(),
    selectedId: selected ? selected.id : ""
  };
}

export type UseDiscussion = ReturnType<typeof useDiscussionProvider>;

export const Context = createContext<null | UseDiscussion>(null);

export const useDiscussion = (): UseDiscussion =>
  useContext(Context) as UseDiscussion;

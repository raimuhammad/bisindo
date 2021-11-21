import { PaginatorProvider } from "@providers/model-provider/paginators";
import type { KeyOfMutation } from "@providers/model-provider/mutation";
import { MutationFormProvider } from "@providers/model-provider/mutation";
import { Context, FormMode, useDiscussionProvider } from "./provider";
import { DiscussionForm } from "./discussion-form";
import { DiscussionList } from "./discussion-list";

type Props = {
  gradeId: string;
};
const mutateKeyHelper: Record<FormMode, KeyOfMutation> = {
  addReply: "addDiscussionReply",
  create: "addDiscussion",
  edit: "editDiscussion",
  editReply: "editDiscussionReply",
};
export const DiscussionContainer = ({ gradeId }: Props) => {
  const context = useDiscussionProvider(gradeId);
  const formKey: KeyOfMutation = context.formMode
    ? mutateKeyHelper[context.formMode]
    : "addDiscussion";
  const parser = ({ content }: any) => {
    const base: Record<string, any> = {
      content: JSON.stringify(content),
      userId: context.userId,
      gradeId,
    };
    if (context.formMode === "addReply" && context.selectedId) {
      base.discussionId = context.selectedId;
    } else if (
      context.selectedId &&
      (context.formMode === "edit" || context.formMode === "editReply")
    ) {
      base.id = context.selectedId;
    }
    return base;
  };
  return (
    <Context.Provider value={context}>
      <PaginatorProvider dataKey="discussion" includes={{ gradeId }}>
        <MutationFormProvider mutateKey={formKey} parser={parser}>
          <DiscussionForm />
        </MutationFormProvider>
        <DiscussionList />
      </PaginatorProvider>
    </Context.Provider>
  );
};

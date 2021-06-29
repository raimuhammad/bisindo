import { DiscussionModelType, UserModelType } from "@root/models";
import { formFactory } from "./form-factory";
import { useToggle } from "@hooks/use-toggle";

type Props = {
  discussion: DiscussionModelType | null;
  user: UserModelType;
  onSuccess: () => void;
};
export function useReplyThread({
  discussion,
  user,
  onSuccess,
}: Props): [[boolean, () => void], ReturnType<typeof formFactory>] {
  const [openCollapse, { toggle, inline }] = useToggle();
  const utils = formFactory({
    onFormSuccess: () => {
      onSuccess();
      inline(false);
    },
    queryGetter(root: RootModel, data: any): any {
      return root.mutateDiscussionReply({
        ...data,
        userId: user.id,
        discussionId: discussion?.id,
      });
    },
  });
  return [[openCollapse, toggle], utils];
}

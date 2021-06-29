import { useToggle } from "@hooks/use-toggle";
import { formFactory } from "./form-factory";
import { useSnackbar } from "notistack";
import { GradeModelType, UserModelType } from "@root/models";

export function useCreateThread({
  user,
  grade,
  onSuccess,
}: {
  user: UserModelType;
  grade: GradeModelType;
  onSuccess(): void;
}): [[boolean, () => void], ReturnType<typeof formFactory>] {
  const [openCollapse, { inline, toggle }] = useToggle();
  const { enqueueSnackbar } = useSnackbar();
  const utils = formFactory({
    onFormSuccess(form) {
      form?.reset({});
      enqueueSnackbar("Thread baru berhasil di tambahkan", {
        variant: "success",
      });
      onSuccess();
      inline(false);
    },
    queryGetter(root: RootModel, data: any): any {
      return root.mutateDiscussion({
        ...data,
        userId: user.id,
        gradeId: grade.id,
      });
    },
  });
  return [[openCollapse, toggle], utils];
}

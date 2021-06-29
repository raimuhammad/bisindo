import {
  DiscussionModel,
  DiscussionModelType,
  DiscussionReplyModelType,
} from "@root/models";
import { formFactory } from "./form-factory";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useToggle } from "@hooks/use-toggle";
import { useDiscussion } from "./provider";
import { useEffect } from "react";

type UseEdit = [
  [
    {
      allowEdit: boolean;
      editMode: boolean;
    },
    () => void
  ],
  ReturnType<typeof formFactory>
];

export function useEditDiscussion(
  model: DiscussionModelType | DiscussionReplyModelType
): UseEdit {
  const { user } = useDiscussion();
  const isDiscussion = DiscussionModel.is(model);
  const [editMode, { inline }] = useToggle();
  const query = (root: RootModel, data: any) => {
    const args: any = {
      id: model.id,
      content: (data.content),
    };
    if (isDiscussion) {
      return root.mutateUpdateDiscussion(args);
    }
    return root.mutateUpdateDiscussionReply(args);
  };
  const form = useForm({
    defaultValues: {
      content: model.content,
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const allowEdit = user.id === model.user.id;
  const toggle = () => {
    if (allowEdit) inline(!editMode);
  };

  useEffect(() => {
    if (editMode) {
      form.setValue("content", model.content);
    }
  }, [model, editMode]);

  const utils = formFactory({
    form,
    onFormSuccess() {
      enqueueSnackbar("Perubahan berhasil disimpan", { variant: "success" });
      inline(false);
    },
    queryGetter: query,
  });

  return [
    [
      {
        allowEdit,
        editMode,
      },
      toggle,
    ],
    utils,
  ];
}

import * as React from "react";
import {
  Box,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";
import { useDiscussion } from "./provider";
import { DraftJsViewer } from "../draft-js-viewer";
import { observer } from "mobx-react";
import {
  DiscussionModel,
  DiscussionModelType,
  DiscussionReplyModelType,
  useQuery,
} from "@root/models";
import { ReplyForm } from "./create-form";
import moment from "moment";
import { Delete, Edit } from "@material-ui/icons";
import { useEditDiscussion } from "./use-edit-discussion";
import { Form } from "./create-form";
import { FormProvider } from "react-hook-form";

const DeleteNode = observer(
  ({ model }: { model: DiscussionModelType | DiscussionReplyModelType }) => {
    const { data, loading, setQuery } = useQuery<any>();
    const { pushDeleted, refresh } = useDiscussion();
    const isDiscussion = DiscussionModel.is(model);

    React.useEffect(() => {
      if (data) {
        if (isDiscussion) {
          pushDeleted(model.id);
        } else {
          refresh();
        }
      }
    }, [data]);

    const handler = () => {
      setQuery((store: RootModel) => {
        const args = {
          id: model.id,
        };
        if (isDiscussion) {
          return store.mutateDeleteDiscussion(args);
        }
        return store.mutateDeleteDiscussionReply(args);
      });
    };

    return (
      <IconButton onClick={handler} disabled={loading}>
        <Delete />
      </IconButton>
    );
  }
);

const View = observer(
  ({ model }: { model: DiscussionModelType | DiscussionReplyModelType }) => {
    const theme = useTheme();
    const [[{ allowEdit, editMode }, toggle], utils] = useEditDiscussion(model);
    const { form, onSubmit, loading } = utils();
    return (
      <div>
        <Box display="flex">
          <Box flex={1}>
            <Typography variant="h6">{model.user.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              pada tanggal : {moment(model.created_at).format("dddd, D MM Y")}
            </Typography>
          </Box>
          {allowEdit ? (
            <Box>
              <IconButton onClick={toggle}>
                <Edit />
              </IconButton>
              <DeleteNode model={model} />
            </Box>
          ) : null}
        </Box>
        <Box bgcolor="#e5e5e5" padding={1} borderRadius={theme.spacing(1)}>
          {editMode ? (
            <FormProvider {...form}>
              <Form loading={loading} onSubmit={onSubmit} />
            </FormProvider>
          ) : (
            <DraftJsViewer data={model.content as string} />
          )}
        </Box>
      </div>
    );
  }
);

const ReplyList = observer(({ model }: { model: DiscussionModelType }) => {
  return (
    <Box>
      <Box padding={2}>
        <View model={model} />
        <Box paddingLeft={3} paddingY={2}>
          {(model.replies ?? []).map((item) => (
            <Box marginBottom={1} key={item.id}>
              <View model={item} />
            </Box>
          ))}
        </Box>
      </Box>
      <ReplyForm />
    </Box>
  );
});

export const DiscussionView = observer(() => {
  const { selected } = useDiscussion();
  if (!selected) {
    return <></>;
  }
  return (
    <Box padding={1}>
      <Paper>
        <ReplyList model={selected} />
      </Paper>
    </Box>
  );
});

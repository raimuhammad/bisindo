import { DiscussionReplyModelType } from "@root/models";
import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import { useDiscussion } from "./provider";
import { DraftJsViewer } from "@components/draft-js-viewer";
import { Delete, Edit } from "@mui/icons-material";
import { useDelete } from "@hooks/use-delete-api";
import { RootStoreBaseMutations } from "@root-model";

type Props = {
  replies: DiscussionReplyModelType[];
};

const CrudControl = ({ model }: { model: DiscussionReplyModelType }) => {
  const { setSelected, setFormMode } = useDiscussion();
  const { handleOpenDialog } = useDelete();
  const onDelete = handleOpenDialog(
    model,
    RootStoreBaseMutations.mutateDeleteDiscussionReply
  );
  const onEdit = () => {
    setSelected(model);
    setFormMode("editReply");
  };
  return (
    <Box sx={{ py: 1, textAlign: "right" }}>
      <IconButton color="primary" onClick={onEdit}>
        <Edit />
      </IconButton>
      <IconButton color="error" onClick={onDelete}>
        <Delete />
      </IconButton>
    </Box>
  );
};

const ReplyCard = ({ model }: { model: DiscussionReplyModelType }) => {
  const { enableCrud } = useDiscussion();
  return (
    <Box sx={{ p: 1, ml: [0, 3, 10] }}>
      <Box sx={{ display: "flex", py: 1 }}>
        <Box>
          <Avatar src="/test.png" alt={model.user.name} />
        </Box>
        <Box>
          <Typography sx={{ ml: 1 }} variant="subtitle2">
            {model.user.name}
          </Typography>
          <Typography sx={{ ml: 1 }} variant="subtitle2">
            {model.created_at}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <DraftJsViewer data={model.content as string} />
      {enableCrud(model) ? <CrudControl model={model} /> : null}
      <Divider />
    </Box>
  );
};

export const DiscussionReplyList = ({ replies }: Props) => {
  return (
    <>
      {replies.map((item) => (
        <ReplyCard model={item} key={item.id} />
      ))}
    </>
  );
};

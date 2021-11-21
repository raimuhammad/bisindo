import { useDiscussion } from "./provider";
import type {
  DiscussionModelType,
  DiscussionReplyModelType,
} from "@root/models";
import {
  Box,
  Button,
  Paper,
  Divider,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Collapse,
} from "@mui/material";
import { useCallback, useState } from "react";
import { DraftJsViewer } from "@components/draft-js-viewer";
import { Delete, Edit, ChatBubble, ReplyAll } from "@mui/icons-material";
import { useDelete } from "@hooks/use-delete-api";
import { DiscussionReplyList } from "./discussion-reply-list";

type Props = {
  model: DiscussionModelType;
};

const Header = ({
  model,
}: {
  model: DiscussionModelType | DiscussionReplyModelType;
}) => {
  const { setSelected, setFormMode, enableCrud } = useDiscussion();
  const { handleOpenDialog } = useDelete();
  const handler = useCallback(() => {
    setSelected(model);
    setFormMode("edit");
  }, []);
  const onDelete = handleOpenDialog(model);
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
      {enableCrud(model) ? (
        <Box sx={{ ml: "auto" }}>
          <Tooltip title="Hapus">
            <IconButton color="error" onClick={onDelete}>
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={handler}>
              <Edit />
            </IconButton>
          </Tooltip>
        </Box>
      ) : null}
    </Box>
  );
};

export const DiscussionCard = ({ model }: Props) => {
  const { setSelected, setFormMode } = useDiscussion();
  const handler = useCallback(() => {
    setSelected(model);
    setFormMode("edit");
  }, []);
  const [showReply, setShowReply] = useState<boolean>(false);
  const onAddReply = useCallback(() => {
    setSelected(model);
    setFormMode("addReply");
  }, []);
  return (
    <Paper sx={{ mb: 2 }}>
      <Box sx={{ p: 2 }}>
        <Header model={model} />
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <DraftJsViewer data={model.content as string} />
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex" }}>
          <Button
            startIcon={<ChatBubble />}
            onClick={() => setShowReply(!showReply)}
            sx={{ textTransform: "none" }}
          >
            Tampilkan komentar
          </Button>
          <Button
            startIcon={<ReplyAll />}
            onClick={onAddReply}
            sx={{ textTransform: "none", ml: "auto" }}
          >
            Buat komentar
          </Button>
        </Box>
        <Collapse in={showReply} unmountOnExit>
          {!model.replies.length ? (
            <Typography variant="h5" align="center" sx={{ py: 3 }}>
              Thread ini belum memiliki komentar
            </Typography>
          ) : null}
          <DiscussionReplyList replies={model.replies as any} />
        </Collapse>
      </Box>
    </Paper>
  );
};

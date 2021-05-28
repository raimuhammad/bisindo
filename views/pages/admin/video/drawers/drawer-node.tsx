import * as React from "react";
import { useStore, Action } from "../provider";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Watch } from "./watch";
import { Edit } from "./edit";
import { Description } from "./description";
import { Close } from "@material-ui/icons";

const cMap: Record<Action, React.ComponentType> = {
  WATCH: Watch,
  DESCRIPTION: Description,
  EDIT: Edit,
  QUIZ: React.Fragment,
};
const TMap: Record<Action, string> = {
  WATCH: "Video",
  DESCRIPTION: "Deskripsi",
  EDIT: "Edit konten",
  QUIZ: "Qui",
};

export const DrawerNode = () => {
  const { action, selected, close } = useStore();

  const isOpen = Boolean(action && selected);

  const Component = action ? cMap[action] : React.Fragment;
  const title = action ? TMap[action] : "";

  return (
    <Dialog
      fullWidth
      fullScreen={action === "DESCRIPTION" || action === "EDIT"}
      open={isOpen}
      onClose={close}
    >
      <DialogTitle>
        <Box alignItems="center" component="span" width="100%" display="flex">
          <Typography style={{ flexGrow: 1 }} component="span">
            {title}
          </Typography>
          <IconButton onClick={close}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Component />
      </DialogContent>
    </Dialog>
  );
};

import * as React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import { useVideoDataTable, Action } from "./provider";
import { VideoModelType } from "root/models/stores";
import { Edit } from "components/tables/video/edit";
import { View } from "components/tables/video/view";
import { Delete } from "components/tables/video/delete";

const cmap: Record<Action, React.ComponentType<{ model: VideoModelType }>> = {
  edit: Edit,
  view: View,
  delete: Delete,
};

export const VideoDialog = () => {
  const { selected, action, handleClose } = useVideoDataTable();
  const Node = action ? cmap[action] : null;
  return (
    <Dialog
      PaperProps={{
        style: { width: "70vw" },
      }}
      onClose={handleClose}
      open={Boolean(selected)}
      fullWidth
    >
      <DialogContent>
        {Node ? <Node model={selected as VideoModelType} /> : null}
      </DialogContent>
    </Dialog>
  );
};

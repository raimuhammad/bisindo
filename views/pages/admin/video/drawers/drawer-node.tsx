import * as React from "react";
import { useStore, Action } from "../provider";
import { AppBar, Box, Button, Drawer, Toolbar, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Watch } from "./watch";
import { Edit } from "./edit";
import { Close } from "@mui/icons-material";
import { useNodeDimension } from "@hooks/use-node-dimension";

const cMap: Record<Action, React.ComponentType> = {
  WATCH: Watch,
  EDIT: Edit,
  QUIZ: React.Fragment,
};
const TMap: Record<Action, string> = {
  WATCH: "Video",
  EDIT: "Edit informasi video",
  QUIZ: "Quis",
};

const useClasses = makeStyles(() => ({
  root: {
    height: "80vh",
    backgroundColor: "#e5e5e5",
  },
}));

export const DrawerNode = () => {
  const { action, selected, close } = useStore();

  const isOpen = Boolean(action && selected);

  const Component = action ? cMap[action] : React.Fragment;
  const title = action ? TMap[action] : "";
  const classes = useClasses();
  const {
    nodeRef,
    dimension: { height },
  } = useNodeDimension();
  const contentHeight = `calc(70vh = ${height}px)`;
  return (
    <Drawer
      PaperProps={{ className: classes.root }}
      open={isOpen}
      anchor="bottom"
      onClose={close}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">{title}</Typography>
          <Button
            onClick={close}
            style={{ marginLeft: "auto" }}
            variant="contained"
            color="secondary"
            startIcon={<Close />}
          >
            Tutup
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ height: contentHeight, overflow: "auto" }}>
        <Component />
      </div>
    </Drawer>
  );
};

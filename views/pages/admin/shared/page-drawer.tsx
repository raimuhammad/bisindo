import * as React from "react";
import { AppBar, Box, Button, Drawer, Toolbar, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Close } from "@mui/icons-material";

type Props = {
  isCloseDisable: boolean;
  title: string;
  additionalCompare?: boolean;
  close(): void;
  open: boolean;
};

const useClasses = makeStyles(() => ({
  root: {
    width: "30vw",
  },
}));

export const PageDrawer = ({
  isCloseDisable,
  open,
  title,
  close,
  children,
}: React.PropsWithChildren<Props>) => {
  const classes = useClasses();
  return (
    <Drawer
      PaperProps={{
        className: classes.root,
      }}
      anchor="right"
      open={open}
    >
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography>{title}</Typography>
          <Button
            disabled={isCloseDisable}
            onClick={close}
            startIcon={<Close />}
            color="secondary"
            variant="contained"
            size="small"
          >
            Tutup
          </Button>
        </Toolbar>
      </AppBar>
      <Box padding={2}>{children}</Box>
    </Drawer>
  );
};

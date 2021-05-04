import React, { useEffect, useRef } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { layoutStore } from "./layout.store";
import { Menu } from "@material-ui/icons";

const DesktopNav = () => {
  return (
    <Box marginLeft="auto">
      <Button style={{ color: "white", marginRight: "1rem" }}>Login</Button>
      <Button
        style={{ borderColor: "white", color: "white" }}
        variant="outlined"
      >
        Daftar sekarang
      </Button>
    </Box>
  );
};
const MobileNav = () => {
  return (
    <Box marginLeft="auto">
      <IconButton>
        <Menu style={{ color: "white" }} />
      </IconButton>
    </Box>
  );
};

const useClasses = makeStyles(() => ({
  root: {
    "&[aria-hidden='true']": {
      zIndex: 0,
    },
  },
}));

export const Header = () => {
  const nodeRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (nodeRef.current) {
      const cb = () =>
        nodeRef.current &&
        layoutStore.updateAppbar(nodeRef.current as HTMLElement);
      window.addEventListener("resize", cb);
      cb();
      return () => {
        window.removeEventListener("resize", cb);
      };
    }
  }, [nodeRef]);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useClasses();
  return (
    <AppBar
      aria-hidden={layoutStore.appbarHidden}
      className={classes.root}
      position="fixed"
      ref={nodeRef}
    >
      <Toolbar>
        <IconButton onClick={() => layoutStore.toggleSidebar()}>
          <Menu />
        </IconButton>
        <Box fontWeight="bolder">
          <Typography style={{ fontWeight: "bolder" }}>Bisindo</Typography>
        </Box>
        {isSm ? <MobileNav /> : <DesktopNav />}
      </Toolbar>
    </AppBar>
  );
};

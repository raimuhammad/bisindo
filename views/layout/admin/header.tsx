import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useStyles } from "./style";
import { Menu } from "@material-ui/icons";
import { useLayout } from "../layout-provider";

export const Header = ({ toggle, open }: { toggle(): void; open: boolean }) => {
  const classes = useStyles();
  const layout = useLayout();
  return (
    <AppBar
      ref={layout ? layout.appBarRef : null}
      position="fixed"
      variant="outlined"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={toggle}
          edge="start"
          className={clsx(classes.menuButton)}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap>
          Mini variant drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

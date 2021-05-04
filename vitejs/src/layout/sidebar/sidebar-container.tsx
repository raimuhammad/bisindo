import * as React from "react";
import { useClasses, useDrawerProps } from "./styles";
import { Box, Drawer } from "@material-ui/core";
import { layoutStore } from "root/layout/layout.store";
import { Navigation } from "./navigation";
import { observer } from "mobx-react";

export const SidebarContainer = observer(() => {
  const drawerProps = useDrawerProps();
  const classes = useClasses();
  return (
    <Drawer
      style={{ height: layoutStore.contentStyle.height }}
      variant="permanent"
      {...drawerProps}
    >
      <Box
        justifyContent="center"
        style={{
          paddingTop: layoutStore.appbarHeight,
        }}
        display="flex"
      >
        <Box className={classes.userinfo} textAlign="center">
          <img
            aria-expanded={layoutStore.sideBarOpen}
            src="https://yt3.ggpht.com/ytc/AAUvwnifge5tCj40DRIwdOh0Cxc321D-TVAIqP85Gw=s176-c-k-c0x00ffffff-no-rj"
            alt=""
          />
        </Box>
      </Box>
      <Navigation />
    </Drawer>
  );
});

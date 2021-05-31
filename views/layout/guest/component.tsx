import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import { ProviderWrapper } from "@utils/provider-wrapper";
import { LayoutProvider, useLayout } from "../layout-provider";

const Node = ({ children }: any) => {
  const { appBarRef } = useLayout();
  return (
    <>
      <AppBar ref={appBarRef} position="sticky">
        <Toolbar>
          <Typography variant="h6">BISINDO</Typography>
          <Box marginLeft="auto">
            <Button color="inherit" startIcon={<Lock />} size="small">
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <>{children}</>
    </>
  );
};

export const Component = ProviderWrapper(LayoutProvider, Node);

import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";
import { Lock } from "@material-ui/icons";

export const Component = ({ children }: any) => {
  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant="h6">BISINDO</Typography>
          <Box marginLeft="auto">
            <Button color="inherit" startIcon={<Lock />} size="small">
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

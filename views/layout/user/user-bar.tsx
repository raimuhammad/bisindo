import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useLayout } from "../layout-provider";
import { Navigator } from "./navigator";

export const UserBar = () => {
  const layout = useLayout();
  return (
    <AppBar ref={layout.appBarRef} position="sticky">
      <Container>
        <Toolbar>
          <Typography variant="h5" style={{ flex: 1 }}>
            Bisindo
          </Typography>
          <Box marginLeft="auto">
            <Navigator height={0} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

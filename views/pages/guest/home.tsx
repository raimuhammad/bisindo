import * as React from "react";
import { Box, Button, Typography } from "@material-ui/core";

export const Home = () => {
  return (
    <div>
      <Box
        height="50vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box textAlign="center">
          <Typography variant="h1">Selamat datang di bisindo</Typography>
          <Button size="large" variant="outlined">
            Login
          </Button>
        </Box>
      </Box>
    </div>
  );
};

import * as React from "react";
import { AnimatedFaded } from "components/animated-faded";
import { Box, Button, Typography } from "@material-ui/core";
import { useApp } from "providers/app-provider";

export const ComingSoon = () => {
  const app = useApp();
  return (
    <AnimatedFaded>
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <div>
          <Typography variant="h1">Coming soon</Typography>
          <Button onClick={() => app.logout()}>Logout</Button>
        </div>
      </Box>
    </AnimatedFaded>
  );
};

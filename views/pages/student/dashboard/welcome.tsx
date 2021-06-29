import * as React from "react";
import { useStudent } from "@providers/student-app-provider";
import { Box, Container, Paper, Typography, useTheme } from "@material-ui/core";

export const Welcome = () => {
  const { user } = useStudent();
  const theme = useTheme();
  return (
    <Box bgcolor={theme.palette.primary.main}>
      <Container>
        <>
          <Box color="white" paddingY={2}>
            <Typography variant="h5" color="inherit">
              Selamat datang
            </Typography>
            <Typography variant="h3" color="inherit">
              {user.name}
            </Typography>
          </Box>
        </>
      </Container>
    </Box>
  );
};

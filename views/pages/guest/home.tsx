import * as React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";
import { LoginForm } from "@pages/shared/user-management";
import { useLayout } from "@root/layout";

export const Home = () => {
  const theme = useTheme();
  const { getContentHeight } = useLayout();
  return (
    <div>
      <Box bgcolor={theme.palette.primary.dark} height={getContentHeight(0)}>
        <Container>
          <Grid
            container
            alignItems="center"
            style={{ height: getContentHeight(0) }}
          >
            <Grid item sm={12} md={8}>
              <>
                <Box padding={2} color="white">
                  <Typography variant="h3" color="inherit">
                    Selamat datang di bisindo
                  </Typography>
                  <Typography color="inherit">
                    Silahkan login dengan akun anda
                  </Typography>
                </Box>
              </>
            </Grid>
            <Grid item md={4} sm={12}>
              <Paper>
                <Box padding={1}>
                  <LoginForm />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

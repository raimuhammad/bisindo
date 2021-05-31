import * as React from "react";
import { useLayout } from "@root/layout";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "@hooks/use-navigate";
import { InvitationForm } from "@pages/shared/user-management";

const Container = ({ children }: any) => {
  const { getContentHeight } = useLayout();
  return (
    <Box
      minHeight={getContentHeight(0)}
      alignItems="center"
      justifyContent="center"
      display="flex"
    >
      {children}
    </Box>
  );
};

const Form = () => {
  const params = useParams<{ invitation: string }>();
  return (
    <Paper>
      <Box padding={2}>
        <Typography align="center" variant="h4">
          Kode invitasi
        </Typography>
        <Typography
          style={{ fontWeight: "bolder" }}
          align="center"
          variant="h3"
        >
          {params.invitation}
        </Typography>
        <Box paddingY={2}>
          <InvitationForm invitation={params.invitation} />
        </Box>
      </Box>
    </Paper>
  );
};

export const Invitation = () => {
  const params = useParams<{ invitation: string }>();
  const { navigate } = useNavigate();
  useEffect(() => {
    if (!params.invitation) {
      navigate("/");
    }
  }, []);

  return (
    <Grid component={Container} container>
      <Grid sm={12} md={6}>
        <div>
          <Typography align="center" variant="h3">
            Selamat datang di bisindo
          </Typography>
          <Typography align="center">
            Silahkan buat password anda untuk login
          </Typography>
        </div>
        <Box padding={2}>
          <Form />
        </Box>
      </Grid>
    </Grid>
  );
};

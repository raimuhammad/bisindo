import React from "react";
import { formWrapper, WrapperProps } from "components/form-wrapper";
import { formInstance } from "./properties";
import { observer } from "mobx-react";
import { useApp } from "providers/app-provider";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { FormField } from "components/form-fields/form-field";

const Component = observer(({ instance }: WrapperProps<boolean, any>) => {
  const app = useApp();
  console.log(app);
  React.useEffect(() => {
    if (instance.result) {
      app.recheckAuth();
    }
  }, [instance]);

  return (
    <Box height="100vh" display="flex">
      <Grid container alignItems="center" justify="center">
        <Grid sm={12} lg={4} item>
          <Paper>
            <Box padding={2}>
              <Typography align="center" variant="h4">
                Ganti password
              </Typography>
              <Divider />
              <form onSubmit={instance.handler}>
                <Box marginY={2}>
                  <FormField
                    label="Password"
                    fullWidth
                    variant="outlined"
                    name="password"
                  />
                </Box>
                <div>
                  <FormField
                    label="Konfirmasi password"
                    fullWidth
                    variant="outlined"
                    name="passwordConfirmation"
                  />
                </div>
                <Box textAlign="right" paddingY={2}>
                  <Button type="submit">Simpan</Button>
                </Box>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
});

export const Page = formWrapper<boolean>(Component, formInstance);

export const InvitationFail = () => <div>Invitation fail page</div>;

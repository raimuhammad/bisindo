import * as React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { FormField } from "components/form-fields/form-field";
import voca from "voca";

const fields = [
  { name: "email", label: "email", type: "email" },
  { name: "password", label: "password", type: "password" },
].map((item) => ({
  ...item,
  label: voca(item.label).capitalize().value(),
}));

type Props = {
  onSubmit(e: any): void;
  loading: boolean;
};

export const FieldContainer = ({ onSubmit, loading }: Props) => {
  return (
    <div>
      <Box padding={2}>
        <Paper variant="outlined">
          <Box component="form" onSubmit={onSubmit} padding={2}>
            <Typography style={{ fontWeight: "bolder" }}>Login</Typography>
            <Divider style={{ marginBlock: ".5rem" }} />
            <div>
              {fields.map((item) => (
                <div key={item.name}>
                  <Box padding={2}>
                    <FormField fullWidth {...item} variant="outlined" />
                  </Box>
                </div>
              ))}
            </div>
            <Box paddingX={2} display="flex" justifyContent="flex-end">
              <Button type="submit" disabled={loading}>
                Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

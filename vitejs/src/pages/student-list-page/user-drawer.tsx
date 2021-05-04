import * as React from "react";
import { Box, Button, Drawer } from "@material-ui/core";
import { useToggle } from "hooks/use-toggle";
import { observer } from "mobx-react";
import { AddUserForm } from "./add-user-form";

export const UserDrawer = observer(
  ({ onSuccess }: { onSuccess: () => void }) => {
    const [open, { force, inline }] = useToggle();

    const handleSuccess = () => {
      onSuccess();
      inline(false);
    };

    return (
      <>
        <Button onClick={force(true)}>Tambah pengguna</Button>
        <Drawer
          open={open}
          anchor="right"
          PaperProps={{ style: { width: "30vw" } }}
        >
          <Box padding={2} marginTop={2}>
            <Button
              color="secondary"
              fullWidth
              variant="outlined"
              onClick={force(false)}
            >
              Tutup
            </Button>
          </Box>
          <AddUserForm onSuccess={handleSuccess} />
        </Drawer>
      </>
    );
  }
);

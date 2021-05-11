import * as React from "react";
import { Action, useGradePage } from "./provider";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { observer } from "mobx-react";
import { FormField } from "components/form-fields/form-field";
import { FormProvider } from "react-hook-form";
import { useGradeForm } from "./utils";

const messages: Partial<Record<Action, string>> = {
  create: "Jenjang berhasil di tambahkan",
  edit: "Jenjang berhasil di edit",
};

export const GradeForm = observer(() => {
  const { selected, handleClose, action, fetch } = useGradePage();
  const open = Boolean(action === "edit" || action === "create");
  const getMessage = () => {
    if (!action) return "";
    return messages[action] as string;
  };
  const { form, handler } = useGradeForm({
    model: selected,
    onSuccess: () => {
      if (!selected) {
        fetch();
      }
      handleClose();
    },
    message: getMessage(),
  });
  return (
    <FormProvider {...form}>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h4">
            {selected ? "Ganti nama jenjang" : "Tambah jenjang"}
          </Typography>
          <Box marginY={5}>
            <FormField label="Nama" variant="outlined" name="name" fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handler}>Simpan</Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
});

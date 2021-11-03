import * as React from "react";
import { useToggle } from "@hooks/use-toggle";
import { useDeleteQuiz } from "@service-provider/quiz";
import { useStore } from "../provider";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@components/loading-button";
import { Delete, Close } from "@mui/icons-material";
import { observer } from "mobx-react";

export const DeleteMode = observer(() => {
  const { modeHandler, selected, mode } = useStore();
  const [hasLoading, { inline }] = useToggle();
  const handleClose = () => {
    if (!hasLoading) {
      modeHandler("list");
    }
  };
  const { onConfirmed, loading } = useDeleteQuiz({
    quiz: selected,
    onLoading: inline,
    callback: handleClose,
  });
  const isOpen = Boolean(mode === "delete" && selected);
  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h5">
            Apakah anda yakin untuk menghapus quis ini ?
          </Typography>
          <Box textAlign="right" paddingY={2}>
            <Button
              disabled={loading}
              onClick={handleClose}
              startIcon={<Close />}
              variant="contained"
              color="secondary"
            >
              Batal
            </Button>
            <LoadingButton
              style={{ marginLeft: ".5rem" }}
              onClick={onConfirmed}
              variant="text"
              color="primary"
              loading={loading}
              icon={<Delete />}
            >
              Ya
            </LoadingButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
});

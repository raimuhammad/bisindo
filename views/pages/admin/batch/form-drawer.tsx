import * as React from "react";
import { useStore } from "./provider";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useToggle } from "@hooks/use-toggle";
import { services } from "@services/batch-service";
import { FormField } from "@components/form-field/form-field";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useSuccessModal } from "@hooks/use-success-modal";
import { Save } from "@mui/icons-material";

const { create, update } = services;

const Form = ({
  handler,
  loading,
}: {
  handler(e: any): void;
  loading: boolean;
}) => {
  return (
    <form onSubmit={handler}>
      <FormField
        label="Masukan nama batch"
        name="name"
        fullWidth
        variant="outlined"
        disabled={loading}
      />
      <Box marginTop={2}>
        <Button
          type="submit"
          startIcon={loading ? <CircularProgress size={15} /> : <Save />}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Simpan
        </Button>
      </Box>
    </form>
  );
};

const Node = observer(
  ({
    message,
    onLoading,
    onSuccess,
  }: {
    message: string;
    onLoading(v: boolean): void;
    onSuccess(): void;
  }) => {
    const { selected } = useStore();
    const args: any = {
      initialValue: {
        name: selected ? selected.name : "",
      },
    };
    if (selected) {
      args.injectInput = {
        id: selected.id,
      };
    }
    const { loading, provider: Provider, handler, result } = (selected
      ? update
      : create)(args);
    const showMessage = useSuccessModal({
      callback: onSuccess,
      disableAutoShow: true,
      message,
      depedencies: Boolean(result),
    });

    useEffect(() => {
      if (result) {
        showMessage();
      }
    }, [result]);

    React.useEffect(() => {
      onLoading(loading);
    }, [loading]);

    return (
      <Provider>
        <Form handler={handler} loading={loading} />
      </Provider>
    );
  }
);

export const FormDrawer = () => {
  const { action, selected, close, go } = useStore();
  const isOpen = Boolean(action);
  const [hasLoading, { inline }] = useToggle();

  const handleDrawerClose = () => {
    !hasLoading && close();
  };
  const title = selected ? "Edit batch" : "Tambah Batch";
  const message = selected
    ? "Batch berhasil di edit"
    : "Batch berhasil di tambahkan";
  const onSuccess = () => {
    inline(false);
    close();
    if (!selected) {
      go(1);
    }
  };
  return (
    <Dialog fullWidth open={isOpen} onClose={handleDrawerClose}>
      <DialogTitle>{isOpen ? title : ""}</DialogTitle>
      <DialogContent>
        <Node onSuccess={onSuccess} message={message} onLoading={inline} />
      </DialogContent>
    </Dialog>
  );
};

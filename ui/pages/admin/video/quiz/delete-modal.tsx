import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useQuizInfo } from "./provider";
import { RootStoreType, useQuery } from "@root/models";
import { useToggle } from "@hooks/use-toggle";
import { usePaginator } from "@providers/model-provider/paginators";
import { useSnackbar } from "notistack";

export const DeleteModal = () => {
  const { selected, action, handleClose } = useQuizInfo();
  const { store } = useQuery();
  const [loading, { inline }] = useToggle();
  const { initialFetch } = usePaginator();
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = () => {
    if (selected) {
      inline(true);
      (store as RootStoreType)
        .mutateQuizDelete({
          id: selected.id,
        })
        .then(() => {
          inline(false);
          initialFetch();
          enqueueSnackbar("Quiz berhasil di hapus", {
            variant: "success",
          });
          handleClose();
        });
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={Boolean(selected && action === "delete")}
    >
      <DialogContent>
        <Typography>Apakah anda yakin untuk menghapus ?</Typography>
      </DialogContent>
      <DialogActions
        sx={{
          "& > button": {
            textTransform: "none",
          },
        }}
      >
        <Button onClick={handleClose}>Batal</Button>
        <Button disabled={loading} onClick={handleDelete} color="error">
          Hapus
        </Button>
      </DialogActions>
    </Dialog>
  );
};

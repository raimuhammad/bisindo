import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Tooltip,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { useToggle } from "hooks/use-toggle";
import { GradeForm } from "../shared/grade-form";
import { gradeService } from "services/grade";
import { observer } from "mobx-react";
import { useSuccessModal } from "hooks/use-success-modal";

type Props = {
  onSuccess: () => void;
};

const useEdit = gradeService.create;

export const Create = observer(({ onSuccess }: Props) => {
  const [open, { force, inline }] = useToggle();
  const utils = useEdit({});
  const showModal = useSuccessModal({
    callback: () => {
      onSuccess();
      inline(false);
    },
    message: "Batch berhasil di tambahkan",
    depedencies: Boolean(utils.result),
  });

  React.useEffect(() => {
    if (utils.result) {
      showModal();
    }
  }, [utils.result]);

  return (
    <>
      <Tooltip title="Tambah batch baru">
        <Button startIcon={<AddCircle />} onClick={force(true)}>
          Tambah batch baru
        </Button>
      </Tooltip>
      <Dialog fullWidth open={open}>
        <DialogTitle>Ubah nama batch</DialogTitle>
        <DialogContent>
          <GradeForm onClose={force(false)} {...utils} />
        </DialogContent>
      </Dialog>
    </>
  );
});

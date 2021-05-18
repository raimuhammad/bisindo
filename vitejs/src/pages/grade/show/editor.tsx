import * as React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { GradeModelType } from "root/models/stores";
import { useToggle } from "hooks/use-toggle";
import { GradeForm } from "../shared/grade-form";
import { gradeService } from "services/grade";
import { observer } from "mobx-react";
import { useSuccessModal } from "hooks/use-success-modal";
import { usePreloadPage } from "components/preload-page";

type Props = {
  grade: GradeModelType;
};

const useEdit = gradeService.update;

export const Editor = observer(({ grade }: Props) => {
  const [open, { force, inline }] = useToggle();
  const { refetch } = usePreloadPage();
  const utils = useEdit({
    injectInput: {
      id: grade.id,
    },
    initialValue: {
      name: grade.name,
    },
  });
  const showModal = useSuccessModal({
    callback: () => {
      refetch();
      inline(false);
    },
    message: "Batch berhasil di edit",
    depedencies: Boolean(utils.result),
  });

  React.useEffect(() => {
    if (utils.result) {
      showModal();
    }
  }, [utils.result]);

  return (
    <>
      <Tooltip title="Ganti nama batch">
        <IconButton onClick={force(true)}>
          <Edit />
        </IconButton>
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

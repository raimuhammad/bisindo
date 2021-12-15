import { Dialog, DialogContent } from "@mui/material";
import { PropsWithChildren } from "react";

type Props = {
  handleClose(): void;
  open: boolean;
  isCloseDisabled: boolean;
};
export const FormDialog = ({
  children,
  handleClose,
  open,
  isCloseDisabled,
}: PropsWithChildren<Props>) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          minWidth: ["80vw", "50vw"],
        },
      }}
      onClose={isCloseDisabled ? undefined : handleClose}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

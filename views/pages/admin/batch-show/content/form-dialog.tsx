import * as React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import { Action, useAction } from "./utils";

type Props = {
  keyName: Action;
};

export const FormDialog = ({
  keyName,
  children,
}: React.PropsWithChildren<Props>) => {
  const { is, close } = useAction();
  return (
    <Dialog onBackdropClick={close} fullWidth open={is(keyName)} onClose={close}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

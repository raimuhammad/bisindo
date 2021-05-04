import * as React from "react";
import { RowProps } from "components/data-table";
import { useQuery, UserModelType } from "root/models/stores";
import {
  Button,
  ButtonGroup,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useStudentListPage } from "./utils";
import { ChevronRight } from "@material-ui/icons";
import { motion } from "framer-motion";
import { observer } from "mobx-react";
import { Box } from "@material-ui/core";
import { useSuccessModal } from "hooks/use-success-modal";

const variants = {
  active: {
    rotate: 90,
  },
  initial: {
    rotate: 0,
  },
};

const Invitation = observer(
  ({ model, onSuccess }: { model: UserModelType; onSuccess(): void }) => {
    const { data, setQuery, loading } = useQuery<{
      sentInvitation: boolean;
    }>();

    useSuccessModal({
      callback: onSuccess,
      depedencies: Boolean(data && data.sentInvitation),
      message: "Kode invitasi berhasil di kirim",
    });
    const handler = () => {
      return setQuery((store: RootModel) =>
        store.mutateSentInvitation({
          id: model.id,
        })
      );
    };

    return (
      <Button size="small" onClick={handler} disabled={loading}>
        Kirim ulang kode invitasi
      </Button>
    );
  }
);

export const Row = observer(({ model }: RowProps<UserModelType>) => {
  const pageProps = useStudentListPage();
  const open = pageProps.selected ? pageProps.selected.id === model.id : false;
  const handleClose = () => pageProps.detach();
  const handler = () => (!open ? pageProps.attach(model) : handleClose());
  return (
    <>
      <TableRow>
        <TableCell style={{ width: 10 }}>
          <IconButton onClick={handler} size="small">
            <motion.div
              initial="initial"
              animate={open ? "active" : ""}
              variants={variants}
            >
              <ChevronRight />
            </motion.div>
          </IconButton>
        </TableCell>
        <TableCell>{model.name}</TableCell>
        <TableCell>{model.email}</TableCell>
        <TableCell>{model.active ? "Aktif" : "Tidak aktif"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} style={{ padding: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box padding={2}>
              {model.active ? (
                <Typography>Akun telah aktif</Typography>
              ) : (
                <Invitation onSuccess={handleClose} model={model} />
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
});

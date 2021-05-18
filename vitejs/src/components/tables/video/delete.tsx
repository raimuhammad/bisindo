import * as React from "react";
import { VideoModelType } from "root/models/stores";
import { useDeleteVideo } from "./utils";
import { useVideoDataTable } from "./provider";
import { observer } from "mobx-react";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { useSuccessModal } from "hooks/use-success-modal";

type Props = {
  model: VideoModelType;
};
export const Delete = observer(({ model: { id } }: Props) => {
  const { loading, resolver, result } = useDeleteVideo({
    injectInput: {
      id,
    },
  });

  const { setHasLoading, handleClose, refresh } = useVideoDataTable();
  useSuccessModal({
    callback: refresh,
    message: "Video berhasil di hapus",
    depedencies: Boolean(result),
  });
  React.useEffect(() => {
    setHasLoading(loading);
  }, [loading]);

  return (
    <div>
      <Typography>Apakah anda yakin untuk menghapus video ini ?</Typography>
      <Box display="flex">
        <Box marginRight={2}>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Tidak
          </Button>
        </Box>
        <Button
          disabled={loading}
          onClick={() => resolver({})}
          variant="outlined"
        >
          {loading ? <CircularProgress size={15} /> : "Ya"}
        </Button>
      </Box>
    </div>
  );
});

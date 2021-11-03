import * as React from "react";
import { FormDialog } from "./form-dialog";
import { useContentPaginator, useDelete } from "@service-provider/content";
import { Box, Button, Typography } from "@mui/material";
import { Close, Save } from "@mui/icons-material";
import { LoadingButton } from "@components/loading-button";
import { observer } from "mobx-react";
import { useFormCallback } from "./utils";

export const DeleteForm = observer(() => {
  const { selected } = useContentPaginator();
  const { resolver, result, loading } = useDelete({
    injectInput: {
      id: selected ? selected.id : "",
    },
  });
  useFormCallback({
    loading,
  });
  return !selected ? (
    <></>
  ) : (
    <FormDialog keyName="DELETE">
      <Typography>
        Apakah anda yakin untuk menghapus video {selected.title}
      </Typography>
      <Box>
        <Button
          size="small"
          color="secondary"
          variant="outlined"
          startIcon={<Close />}
        >
          Tidak
        </Button>
        <LoadingButton
          onClick={() => resolver()}
          style={{ marginLeft: "1rem" }}
          size="small"
          loading={loading}
          icon={<Save />}
        >
          Ya
        </LoadingButton>
      </Box>
    </FormDialog>
  );
});

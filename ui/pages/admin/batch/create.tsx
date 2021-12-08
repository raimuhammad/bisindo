import { useToggle } from "@hooks/use-toggle";
import { Button, Collapse, Paper } from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { MutationFormProvider } from "@providers/model-provider/mutation";
import { usePaginator } from "@providers/model-provider/paginators";
import { Form } from "./form";
import type { GradeModelType } from "@root/models";
import { useSnackbar } from "notistack";

const buttonSx = {
  marginTop: 2,
  textTransform: "none",
  mb:2
};

export const Create = () => {
  const [open, { toggle, inline }] = useToggle();
  const { enqueueSnackbar } = useSnackbar();
  const { initialFetch } = usePaginator();
  const onSuccess = (model: GradeModelType) => {
    enqueueSnackbar(`${model.name} berhasil di tambahkan`, {
      variant: "success",
    });
    inline(false);
    initialFetch();
  };
  return (
    <>
      <Button
        onClick={toggle}
        startIcon={open ? <Close /> : <Add />}
        sx={buttonSx as any}
        variant="outlined"
      >
        {!open ? "Tambah batch baru" : "Tutup"}
      </Button>
      <Collapse in={open} sx={{mb:2}}  timeout="auto">
        <MutationFormProvider mutateKey="createBatch">
          <Paper sx={{ padding: 2, borderRadius: 0 }}>
            <Form onSuccess={onSuccess} />
          </Paper>
        </MutationFormProvider>
      </Collapse>
    </>
  );
};

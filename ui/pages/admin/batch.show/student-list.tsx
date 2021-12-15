import { Datagrid } from "@components/datagrid";
import { useBatchShow } from "./context";
import {
  PaginatorProvider,
  usePaginator,
} from "@providers/model-provider/paginators";
import { useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { observer } from "mobx-react";
import { Box, Button, Collapse, Grid, Typography, Paper } from "@mui/material";
import { useToggle } from "@hooks/use-toggle";
import {
  MutationFormProvider,
  useMutationForm,
} from "@providers/model-provider/mutation";
import { FormField } from "@components/form-field/form-field";
import { FormProvider } from "react-hook-form";
import { SubmitButton } from "@components/submit-button";
import { Add } from "@mui/icons-material";
import { usePopup } from "@hooks/use-popup";
import { WithBatchShow } from "@admin-pages/batch.show/with-batch-show";
import {
  useStudentFormProvider,
  StudentFormContext,
  useStudentForm,
} from "./student/provider";
import { DrawerForm } from "./student/drawer-form";

const columns: GridColDef[] = [
  { field: "name", headerName: "Nama siswa", flex: 1 },
  {
    field: "email",
    headerName: "Alamat email",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.2,
    valueGetter(v) {
      return v.row.status ? "Aktif" : "Non aktif";
    },
  },
];

const AddStudentForm = observer(() => {
  const [open, { toggle, force }] = useToggle();
  const { loading, form, handler, response } = useMutationForm();
  const { initialFetch } = usePaginator();
  usePopup({
    message: "Siswa berhasil di tambahkan",
    show: Boolean(response),
    variant: "success",
    callback(v?: any) {
      force(false)();
      form.reset();
      initialFetch();
    },
  });
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Button color={!open ? "primary" : "error"} onClick={toggle}>
        {open ? "Tutup" : "Tambahkan siswa"}
      </Button>
      <Collapse sx={{ mt: open ? 2 : 0 }} in={open}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <FormProvider {...form}>
              <form onSubmit={handler}>
                <FormField
                  sx={{ mb: 4 }}
                  label="Nama siswa"
                  name="name"
                  fullWidth
                />
                <FormField
                  type="email"
                  label="Alamat email"
                  fullWidth
                  name="email"
                />
                <SubmitButton sx={{ mt: 3 }} icon={<Add />} loading={loading}>
                  Simpan
                </SubmitButton>
              </form>
            </FormProvider>
          </Grid>
          <Grid item xs={12} md={6} sx={{ px: 2 }}>
            <Typography variant="subtitle1">
              Tambahkan siswa dengan mengirim email invitasi yang akan di
              daftarkan, siswa dapat login dengan link yang di berikan untuk
              mengganti password.
            </Typography>
          </Grid>
        </Grid>
      </Collapse>
    </Paper>
  );
});

const Content = observer(() => {
  const {
    result,
    initialFetch,
    actions: { go },
  } = usePaginator();
  useEffect(() => {
    initialFetch();
  }, []);
  const sources = result.data.map((item) => ({
    name: item.student.name,
    email: item.student.email,
    id: item.student.id,
    status: item.student.active,
  }));
  const { changeStudent } = useStudentForm();
  return (
    <Box sx={{ py: 2 }}>
      <Datagrid
        onRowClick={changeStudent}
        paginationHandler={go}
        paginator={result.paginator}
        columns={columns}
        rows={sources}
      />
    </Box>
  );
});

export const StudentList = WithBatchShow(() => {
  const { modelId } = useBatchShow();
  const formctx = useStudentFormProvider();
  return (
    <PaginatorProvider dataKey="students" includes={{ gradeId: modelId }}>
      <MutationFormProvider
        parser={(args) => ({ args })}
        merge={{ grade_id: modelId }}
        mutateKey="addUser"
      >
        <AddStudentForm />
      </MutationFormProvider>
      <StudentFormContext.Provider value={formctx}>
        <DrawerForm />
        <Content />
      </StudentFormContext.Provider>
    </PaginatorProvider>
  );
});

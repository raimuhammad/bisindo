import { useStudentGradePaginator } from "@service-provider/student-grade/paginator";
import { UsePaginator } from "@hooks/use-paginator";
import { StudentGradeModelType } from "@root/models";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { SearchForm } from "@components/search-form";
import * as React from "react";
import { useToggle } from "@hooks/use-toggle";
import { PageDrawer } from "@admin-pages/shared/page-drawer";
import { StudentForm } from "@pages/shared/user-management/student-form";
import { InfoBox } from "@pages/shared/user-management/action-components";
import { useStore } from "../provider";

const CreateUserForm = () => {
  const [open, { force, inline: setOpen }] = useToggle();
  const [isCloseDisabled, { inline }] = useToggle();
  const { model } = useStore();
  const { reset } = useStudentGradePaginator();
  const handleClose = () => {
    if (!isCloseDisabled) {
      setOpen(false);
    }
  };
  return (
    <>
      <Box marginLeft="auto">
        <Button onClick={force(true)} color="inherit">
          Tambah siswa
        </Button>
      </Box>
      <PageDrawer
        isCloseDisable={isCloseDisabled}
        title="Tambah siswa"
        close={handleClose}
        open={open}
      >
        <InfoBox>
          <Typography>
            Tambahkan siswa dengan mengirim email invitasi yang akan di
            daftarkan, siswa dapat login dengan link yang di berikan untuk
            mengganti password.
          </Typography>
        </InfoBox>
        <StudentForm
          grade={model}
          onSuccess={() => {
            reset();
            handleClose();
          }}
          message="Siswa berhasil di tambahkan"
          onLoading={inline}
        />
      </PageDrawer>
    </>
  );
};

export const SearchBar = () => {
  const {
    updateVars,
  } = useStudentGradePaginator() as UsePaginator<StudentGradeModelType>;

  return (
    <AppBar position="static">
      <Toolbar>
        <Box>
          <SearchForm placeholder="Cari nama siswa" handler={updateVars} />
        </Box>
        <CreateUserForm />
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

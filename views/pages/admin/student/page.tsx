import * as React from "react";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { useLayout } from "@root/layout";
import {
  AppBar,
  Box,
  Button,
  LinearProgress,
  Paper,
  Toolbar,
} from "@material-ui/core";
import { SearchForm } from "@components/search-form";
import { observer } from "mobx-react";
import { GradeField } from "@admin-pages/shared/grade-field";
import { usePaginator, Wrapper } from "./context";
import { Datatable } from "./datatable";
import { UserManagementProvider } from "../../shared/user-management";
import { ProviderWrapper } from "@utils/provider-wrapper";
import { useToggle } from "@hooks/use-toggle";
import { PageDrawer } from "@admin-pages/shared/page-drawer";
import { StudentForm } from "@pages/shared/user-management/student-form";

const CreateUserForm = () => {
  const [open, { force, inline: setOpen }] = useToggle();
  const [isCloseDisabled, { inline }] = useToggle();
  const { reset } = usePaginator();
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
        <StudentForm
          onSuccess={reset}
          message="Siswa berhasil di tambahkan"
          onLoading={inline}
        />
      </PageDrawer>
    </>
  );
};

const Com = observer(() => {
  const {
    nodeRef,
    dimension: { height },
  } = useNodeDimension();
  const { getContentHeight } = useLayout();
  const { updateVars, loading } = usePaginator();
  return (
    <>
      <AppBar ref={nodeRef} position="relative">
        <Toolbar>
          <SearchForm handler={updateVars}>
            {(classname) => {
              return (
                <Box paddingX={1}>
                  <GradeField
                    placeholder="Pilih batch"
                    style={{ width: 200 }}
                    InputProps={{
                      className: classname,
                      disableUnderline: false,
                    }}
                  />
                </Box>
              );
            }}
          </SearchForm>
          <CreateUserForm />
        </Toolbar>
        {loading ? (
          <Box position="absolute" width="100%" bottom={0}>
            <LinearProgress />
          </Box>
        ) : null}
      </AppBar>
      {!height ? null : (
        <Box height={getContentHeight(height)} overflow="auto" paddingX={2}>
          <Paper>
            <Datatable height={getContentHeight(height)} />
          </Paper>
        </Box>
      )}
    </>
  );
});

export const Page = ProviderWrapper(UserManagementProvider, Wrapper(Com));

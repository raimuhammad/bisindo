import * as React from "react";
import { ChilProps } from "./type";
import { usePaginate } from "hooks/use-paginate";
import {
  GradeModelType,
  StudentGradeModelSelector,
  StudentGradeModelType,
} from "root/models/stores";
import { RootStoreBaseQueries } from "root-model";
import { observer } from "mobx-react";
import { Box, Button, Drawer } from "@material-ui/core";
import { UserDataTable } from "components/tables/user/user-data-table";
import { useToggle } from "hooks/use-toggle";
import { AddUserForm } from "pages/student-list-page/add-user-form";

const AddStudentDrawer = ({
  onSucces,
  grade,
}: {
  grade: GradeModelType;
  onSucces: () => void;
}) => {
  const [open, { inline, force }] = useToggle();
  const callback = () => {
    onSucces();
    inline(false);
  };
  return (
    <>
      <Button onClick={force(true)}>Tambah pengguna</Button>
      <Drawer
        open={open}
        anchor="right"
        PaperProps={{ style: { width: "30vw" } }}
      >
        <Box padding={2} marginTop={2}>
          <Button
            color="secondary"
            fullWidth
            variant="outlined"
            onClick={force(false)}
          >
            Tutup
          </Button>
        </Box>
        <AddUserForm grade={grade} onSuccess={callback} />
      </Drawer>
    </>
  );
};

export const Students = observer(({ grade, height }: ChilProps) => {
  const [{ data, paginatorInfo }, { go }] = usePaginate<StudentGradeModelType>({
    readOnlyVar: { gradeId: grade.id },
    queryKey: RootStoreBaseQueries.queryGetStudentByGrade,
    selector(instance: StudentGradeModelSelector): StudentGradeModelSelector {
      return instance.student((selector) => selector.name.id.email.active).id;
    },
  });
  const parseData = data.map((item) => item.student);
  return (
    <Box height={height} overflow="auto" paddingRight={2}>
      <UserDataTable
        onPagingChange={go}
        data={parseData}
        paginatorInfo={paginatorInfo}
        height={height}
        HeaderNode={() => (
          <AddStudentDrawer grade={grade} onSucces={() => go(1)} />
        )}
      />
    </Box>
  );
});

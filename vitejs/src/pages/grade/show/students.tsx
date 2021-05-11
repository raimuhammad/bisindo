import * as React from "react";
import { ChilProps } from "./type";
import { usePaginate } from "hooks/use-paginate";
import {
  StudentGradeModelSelector,
  StudentGradeModelType,
} from "root/models/stores";
import { RootStoreBaseQueries } from "root-model";
import { observer } from "mobx-react";
import { Box } from "@material-ui/core";
import { UserDataTable } from "components/tables/user/user-data-table";

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
      />
    </Box>
  );
});

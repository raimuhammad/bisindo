import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { StudentGradeModelType } from "@root/models";
import { Row } from "@admin-pages/shared/user-data-table";
import { useStudentGradePaginator } from "@service-provider/student-grade/paginator";

type Props = {
  height: number;
};
export const DataTable = ({ height }: Props) => {
  const { data } = useStudentGradePaginator();
  return (
    <TableContainer style={{ height, overflow: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Nama</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((model: StudentGradeModelType) => (
            <Row
              key={model.id}
              model={model}
              onClick={() => console.log(model)}
              active={false}
              hideBatch
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

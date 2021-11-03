import * as React from "react";
import { usePaginator } from "./context";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { observer } from "mobx-react";
import { Row } from "@admin-pages/shared/user-data-table";
import { UsePaginator } from "@hooks/use-paginator";
import { Pagination } from '@mui/material';
import { useNodeDimension } from "@hooks/use-node-dimension";
import { DrawerController } from "../batch-show/student/drawer-controller";

export const PageController = () => {
  const { go, paginator, loading } = usePaginator() as UsePaginator<any>;
  return (
    <Box display="flex">
      <Box flex="1">
        <Pagination
          onChange={(e, page) => go(page)}
          disabled={loading}
          color="primary"
          variant="outlined"
          count={paginator.lastPage}
        />
      </Box>
    </Box>
  );
};

export const Datatable = observer(({ height }: { height: number }) => {
  const { data } = usePaginator();
  const { nodeRef, dimension } = useNodeDimension();
  const tableHeight = height - dimension.height;
  return (
    <>
      <DrawerController />
      {tableHeight ? (
        <TableContainer style={{ height: tableHeight }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell>Batch</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <Row
                  key={item.id}
                  model={item}
                  onClick={() => {}}
                  active={false}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
      <div ref={nodeRef as any}>
        <Box padding={2}>
          <PageController />
        </Box>
      </div>
    </>
  );
});

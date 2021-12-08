import { observer } from "mobx-react";
import { DataGrid, GridCell, GridRow, GridColDef } from "@mui/x-data-grid";
import type { SnapshotOut } from "mobx-state-tree";
import type { PaginatorInfoModelType } from "@root/models";

type Props = {
  rows: any;
  columns: GridColDef[];
  paginator: SnapshotOut<PaginatorInfoModelType>;
  paginationHandler(page: number, perPage: number): void;
  onRowClick?(data: any): void;
};

export const Datagrid = observer(
  ({ rows, columns, paginator, paginationHandler, onRowClick }: Props) => {
    const changePage = (page: number) => {
      paginationHandler(page + 1, paginator.perPage as number);
    };
    const changeSize = (perPage: number) => {
      paginationHandler(1, (perPage + 1) as number);
    };
    return (
      <>
        <DataGrid
          pagination
          paginationMode="server"
          onRowClick={(dt) => onRowClick && onRowClick(dt.row)}
          onPageChange={changePage}
          onPageSizeChange={changeSize}
          page={
            paginator.currentPage ? (paginator.currentPage as number) - 1 : 1
          }
          rowsPerPageOptions={[10, 20, 30]}
          rowCount={(paginator.total as number) - 1}
          pageSize={paginator.perPage as number}
          rows={[...rows]}
          columns={columns}
          autoHeight
        />
      </>
    );
  }
);

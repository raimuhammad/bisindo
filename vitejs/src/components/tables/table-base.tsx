import * as React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useNodeDimension } from "hooks/use-node-dimension";
import { PaginatorInfoModelType } from "root/models/stores";

export type Tableprops<T> = {
  data: T[];
  onPagingChange(n: number): void;
  paginatorInfo: PaginatorInfoModelType;
  height: number;
  HeaderNode?: React.ComponentType<any>;
};

export type PaginationTableBase<T> = {
  height: number;
  headerRenderer: React.ComponentType;
  rowRenderer: React.ComponentType<{ model: T }>;
} & Tableprops<T>;

export const TableBase = ({
  height,
  rowRenderer,
  headerRenderer,
  data,
  paginatorInfo,
  onPagingChange,
  HeaderNode,
}: PaginationTableBase<any>) => {
  const { nodeRef, dimension } = useNodeDimension();
  const customHeadRef = useNodeDimension();

  const getTableHeight = () => {
    const base = dimension.height + customHeadRef.dimension.height;
    return dimension.height ? height - base : 0;
  };
  const tableHeight = getTableHeight();
  const Head = headerRenderer;
  const Row = rowRenderer;
  const pageChange = (e: any, n: number) => {
    onPagingChange(n);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      justifyContent="flex-end"
      style={{ height }}
    >
      <div style={{ width: "100%" }} ref={customHeadRef.nodeRef as any}>
        {HeaderNode ? (
          <>
            <Box padding={1}>
              <HeaderNode />
            </Box>
          </>
        ) : null}
      </div>
      <TableContainer style={{ height: tableHeight }}>
        <Table stickyHeader>
          <TableHead>
            <Head />
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <Row model={item} key={item.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ width: "100%" }} ref={nodeRef as any}>
        <Box width="100%" paddingBottom={3}>
          <Paper>
            <Box padding={1}>
              <Pagination
                onChange={pageChange}
                count={paginatorInfo.lastPage as number}
              />
            </Box>
          </Paper>
        </Box>
      </div>
    </Box>
  );
};

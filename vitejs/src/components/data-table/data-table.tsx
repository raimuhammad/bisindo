import * as React from "react";
import { usePageLayout } from "../page-layout";
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@material-ui/core";
import { observer } from "mobx-react";

export type RowProps<T> = {
  model: T;
  refresh(): void;
};

export type Props<T = any> = {
  items: T[];
  rowRenderer: React.ComponentType<RowProps<T>>;
  headerRenderer: React.ComponentType;
  refresh(): void;
  loading: boolean;
};

const useClasses = makeStyles(() => ({
  loader: {
    backgroundColor: "rgba(255, 255, 255, 0.49)",
    zIndex: 1100,
    position: "absolute",
  },
}));

const Loader = observer(({ loading }: { loading: boolean }) => {
  const classes = useClasses();
  return (
    <Backdrop open={loading} className={classes.loader}>
      <CircularProgress />
    </Backdrop>
  );
});

export const DataTable = observer(
  ({ items, headerRenderer, rowRenderer, refresh, loading }: Props) => {
    const pageLayout = usePageLayout();
    const Header = headerRenderer;
    const Row = rowRenderer;
    return (
      <TableContainer style={{ height: pageLayout.contentHeight }}>
        <Loader loading={loading} />
        <Table>
          <TableHead>
            <Header />
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <Row model={item} key={item.id} refresh={refresh} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
);

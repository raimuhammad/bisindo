import * as React from "react";
import { useStore } from "@admin-pages/batch-show/provider";
import { Box } from "@material-ui/core";
import { useDimension } from "./utils";
import { SearchBar } from "./search-bar";
import { PageController } from "./page-controller";
import { DataTable } from "./data-table";
import { DrawerController } from "./drawer-controller";

export const Component = () => {
  const { tableHeight, appbar, paginator } = useDimension();
  const { contentHeight } = useStore();
  return (
    <>
      <Box bgcolor="white" height={contentHeight} overflow="hidden">
        <div ref={appbar as any}>
          <SearchBar />
        </div>
        <Box>
          {tableHeight ? <DataTable height={tableHeight} /> : null}
          <div ref={paginator as any}>
            <Box padding={1}>
              <PageController />
            </Box>
          </div>
        </Box>
      </Box>
      <DrawerController />
    </>
  );
};

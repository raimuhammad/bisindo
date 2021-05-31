import * as React from "react";
import { AppBar, Box, LinearProgress, Toolbar } from "@material-ui/core";
import { SearchForm } from "@components/search-form";
import { Provider, useStore } from "./provider";
import { observer } from "mobx-react";
import { DataTable } from "./data-table";
import { DrawerNode } from "./drawers";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { useLayout } from "@root/layout";

const VideoPage = observer(() => {
  const { updateVars, loading } = useStore();
  const {
    nodeRef,
    dimension: { height },
  } = useNodeDimension();
  const { getContentHeight } = useLayout();
  return (
    <>
      <DrawerNode />
      <AppBar ref={nodeRef} position="relative">
        <Toolbar>
          <SearchForm handler={updateVars} />
        </Toolbar>
        {loading ? (
          <Box position="absolute" width="100%" bottom={0}>
            <LinearProgress />
          </Box>
        ) : null}
      </AppBar>
      {!height ? null : (
        <Box height={getContentHeight(height)} overflow="auto" paddingX={2}>
          <DataTable />
        </Box>
      )}
    </>
  );
});

export const page = Provider(VideoPage);

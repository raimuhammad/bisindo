import * as React from "react";
import { AppBar, Box, LinearProgress, Toolbar } from "@material-ui/core";
import { SearchForm } from "@components/search-form";
import { Provider, useStore } from "./provider";
import { observer } from "mobx-react";
import { DataTable } from "./data-table";
import { DrawerNode } from "./drawers";

const VideoPage = observer(() => {
  const { updateVars, loading } = useStore();
  return (
    <>
      <DrawerNode />
      <AppBar position="relative">
        <Toolbar>
          <SearchForm handler={updateVars} />
        </Toolbar>
        {loading ? (
          <Box position="absolute" width="100%" bottom={0}>
            <LinearProgress />
          </Box>
        ) : null}
      </AppBar>
      <Box padding={2}>
        <DataTable />
      </Box>
    </>
  );
});

export const page = Provider(VideoPage);

import * as React from "react";
import { AppBar, Box, LinearProgress, Toolbar } from "@mui/material";
import { usePaginatorContext } from "@hooks/use-paginator";
import { observer } from "mobx-react";
import { Controller } from "./controller";
import { Content } from "./content";
import { SearchForm } from "@components/search-form";
import { Provider } from "./provider";
import { FormDrawer } from "./form-drawer";

const BatchList = observer(() => {
  const { loading, updateVars } = usePaginatorContext() as BatchPaginator;
  return (
    <>
      {loading ? (
        <Box position="fixed" width="100%" left={0} top={0}>
          <LinearProgress />
        </Box>
      ) : null}

      <FormDrawer />
      <AppBar
        color="transparent"
        variant="outlined"
        sx={{ borderRadius: 2 }}
        position="relative"
      >
        <Toolbar>
          <SearchForm handler={updateVars} />
          <Controller />
        </Toolbar>
      </AppBar>
      <Content />
    </>
  );
});

export const Page = Provider(BatchList);

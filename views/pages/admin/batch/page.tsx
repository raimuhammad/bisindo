import * as React from "react";
import { AppBar, Box, LinearProgress, Toolbar } from "@material-ui/core";
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
      <FormDrawer />
      <AppBar position="relative">
        <Toolbar>
          <SearchForm handler={updateVars} />
          <Controller />
        </Toolbar>
        {loading ? (
          <Box position="absolute" width="100%" bottom={0}>
            <LinearProgress />
          </Box>
        ) : null}
      </AppBar>
      <Content />
    </>
  );
});

export const Page = Provider(BatchList);

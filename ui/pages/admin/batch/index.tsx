import { useAdminLayout } from "@layout/admin.context";
import { Fragment, useEffect } from "react";
import { Box, Container, LinearProgress, Typography } from "@mui/material";
import {
  PaginatorProvider,
  usePaginator,
} from "@providers/model-provider/paginators";
import { useBatchPage, useBatchProvider, BatchContext } from "./provider";
import { Create } from "./create";
import { SearchBar } from "./search-bar";
import { Content } from "./content";
import { useLayout } from "@layout/layout-provider";

const Page = () => {
  const { initialFetch, loading, isEmpty, hasResponse } = usePaginator();
  const { selected } = useBatchPage();
  useEffect(() => {
    initialFetch();
  }, []);
  return (
    <>
      <Container>
        <Create />
      </Container>
      <SearchBar />
      <Content />
    </>
  );
};

const Index = () => {
  const { setTitle } = useAdminLayout();
  const { updateNavs } = useLayout();
  useEffect(() => {
    setTitle("Menagemen batch");
    updateNavs([])
    return () => {
      setTitle("");
    };
  }, []);
  const context = useBatchProvider();
  const { selected } = context;
  return (
    <PaginatorProvider dataKey="grades">
      <BatchContext.Provider value={context}>
        <Page />
      </BatchContext.Provider>
    </PaginatorProvider>
  );
};

export const Batch = () => {
  return <Index />;
};

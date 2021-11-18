import { useAdminLayout } from "@layout/admin.context";
import { useEffect } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import pagesetting from "./page-setting.json";
import { PageBanner } from "@components/page-banner";
import {
  PaginatorProvider,
  usePaginator,
} from "@providers/model-provider/paginators";
import { useBatchPage, useBatchProvider, BatchContext } from "./provider";
import { Create } from './create'
import { SearchBar } from './search-bar'
import { Content } from './content'

const PageContent = () => {
  return <div>Page content</div>;
};

const PageInfo = ({
  status,
  loading,
}: {
  status: string;
  loading: boolean;
}) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      {loading ? <LinearProgress /> : null}
      <Typography sx={{ py: 3 }} variant="h6">
        {loading ? "Loading" : status}
      </Typography>
    </Box>
  );
};

const Page = () => {
  const { initialFetch, loading, isEmpty, hasResponse } = usePaginator();
  const { selected } = useBatchPage();
  useEffect(() => {
    initialFetch();
  }, []);
  return (
    <>
      <PageBanner {...pagesetting}>
        <Create/>
      </PageBanner>
      <SearchBar/>
      <Content/>
    </>
  );
};

export const Batch = () => {
  const { setTitle } = useAdminLayout();
  useEffect(() => {
    setTitle("Menagemen batch");
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

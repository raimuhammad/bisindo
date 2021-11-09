import { useAdminLayout } from "@layout/admin.context";
import { useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import pagesetting from "./page-setting.json";
import { PageBanner } from "@components/page-banner";
import {
  PaginatorProvider,
  usePaginator,
} from "@providers/model-provider/paginators";
import { useBatchPage, useBatchProvider, BatchContext } from "./provider";
import { Create } from "./create";
import { BatchItem } from "./batch-item";
import { useIsSm } from "@hooks/use-media";
import { PageControl } from "./page-control";
import { ContentContext, useContentProvider } from "./content.context";
import { TabContext } from "@mui/lab";
import { PageSwitcher } from "./page-switcher";
import { List } from "@providers/model-provider/lists";

const sx = {
  display: ["block", "flex"],
  minHeight: "100vh",
  "& > div": {
    minHeight: "100vh",
  },
  "& > .list-container": {
    width: ["100%", "20%"],
  },
};

const Page = () => {
  const { initialFetch, loading } = usePaginator();
  const { selected } = useBatchPage();
  useEffect(() => {
    initialFetch();
  }, []);
  const isSm = useIsSm();
  const contentProvider = useContentProvider();
  return (
    <>
      <PageBanner {...pagesetting}>
        <Create />
      </PageBanner>
      <ContentContext.Provider value={contentProvider}>
        <TabContext value={contentProvider[0].tab}>
          <Box sx={{ display: ["block", "flex"], zIndex: 100 }}>
            <PageControl />
          </Box>
          <Box sx={{ display: ["block", "flex"], zIndex: 99 }}>
            {!isSm ? (
              <Box sx={{ height: ["auto", "100vh"], width: ["auto", "20%"] }}>
                <BatchItem />
              </Box>
            ) : (
              <></>
            )}
            <Box sx={{ width: ["100%", "80%"] }}>
              <PageSwitcher />
            </Box>
          </Box>
        </TabContext>
      </ContentContext.Provider>
      {/*<Box sx={sx as any}>*/}
      {/*  <Box className="list-container">*/}
      {/*    <Box*/}
      {/*      sx={{*/}
      {/*        height: ["auto", "100vh"],*/}
      {/*        overflowY: "auto",*/}
      {/*        overflowX: "hidden",*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <BatchItem />*/}
      {/*    </Box>*/}
      {/*  </Box>*/}
      {/*  <Box sx={{ flex: 1 }}>*/}
      {/*    <ContentContainer />*/}
      {/*  </Box>*/}
      {/*</Box>*/}
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
        <List
          dataKey="videoByGrade"
          props={{ gradeId: selected ? selected.id : "" }}
        >
          <Page />
        </List>
      </BatchContext.Provider>
    </PaginatorProvider>
  );
};

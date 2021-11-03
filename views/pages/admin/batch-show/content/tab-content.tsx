import { observer } from "mobx-react";
import { useStore } from "@pages/admin/batch-show/provider";
import { Paginator, useContentPaginator } from "@service-provider/content";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import * as React from "react";
import { VideoContainer } from "./video-container";
import { VideoList } from "./video-list";
import { useManageAction, Provider as Ctx } from "./utils";
import { DeleteForm } from "./delete-form";
import { EditForm } from "./edit-form";

const Informer = () => {
  const { contentHeight: height, model, changeTab } = useStore();
  const { loading, data } = useContentPaginator();
  const isEmpty = data.length === 0 && model.video_count === 0;
  const getText = () => {
    if (isEmpty) {
      return "Batch ini belum memiliki video";
    }
    return loading ? "Mengambil data" : "";
  };
  return (
    <Box
      height={height}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <div>
        {loading ? (
          <Box textAlign="center">
            <CircularProgress size={50} />
          </Box>
        ) : null}
        <Typography variant="h3">{getText()}</Typography>
        {isEmpty ? (
          <Button
            variant="outlined"
            size="large"
            onClick={() => changeTab("VIDEO-ADD")}
          >
            Tambah video
          </Button>
        ) : null}
      </div>
    </Box>
  );
};

export const TabContent = observer(() => {
  const { contentHeight, model } = useStore();
  const { selected, data } = useContentPaginator();
  const ctx = useManageAction();
  const isEmpty = data.length === 0 && model.video_count === 0;
  return (
    <Ctx.Provider value={ctx}>
      <EditForm />
      <DeleteForm />
      <VideoList />
      {/*<Box height={contentHeight} overflow="auto">*/}
      {/*  <Grid justifyContent="center" container>*/}
      {/*    {model.video_count ? (*/}
      {/*      <Grid item component={Paper} sm={12} md={3}>*/}
      {/*      </Grid>*/}
      {/*    ) : null}*/}
      {/*    <Grid item sm={12} md={!isEmpty ? 9 : 12}>*/}
      {/*      <Box minHeight={contentHeight}>*/}
      {/*        {selected ? <VideoContainer model={selected} /> : <Informer />}*/}
      {/*      </Box>*/}
      {/*    </Grid>*/}
      {/*  </Grid>*/}
      {/*</Box>*/}
    </Ctx.Provider>
  );
});

export const Content = Paginator(TabContent);

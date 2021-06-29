import * as React from "react";
import { Provider } from "./data-provider";
import { UserSelector } from "./user-selector";
import { VideoContainer } from "./video-container";
import { useStore } from "../provider";
import { Box, Grid } from "@material-ui/core";

export const Page = () => {
  const { contentHeight } = useStore();
  return (
    <Provider>
      <Grid container>
        <Grid item sm={3}>
          <Box height={contentHeight} overflow="auto">
            <UserSelector />
          </Box>
        </Grid>
        <Grid item sm={9}>
          <Box height={contentHeight} overflow="auto">
            <VideoContainer />
          </Box>
        </Grid>
      </Grid>
    </Provider>
  );
};

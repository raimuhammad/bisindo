import * as React from "react";
import { Box, Divider, Paper, Typography } from "@material-ui/core";
import { DraftJsViewer } from "@components/draft-js-viewer";
import { useVideoPage } from "@providers/study-provider/provider";

export const VideoInfo = () => {
  const { video } = useVideoPage();
  return (
    <div>
      <Paper>
        <Box padding={2}>
          <Box marginBottom={2}>
            <Typography variant="h5">Informasi video</Typography>
            <Divider />
          </Box>
          <DraftJsViewer data={video.description as string} />
        </Box>
      </Paper>
    </div>
  );
};

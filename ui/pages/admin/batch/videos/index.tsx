import { Provider } from "./provider";
import { Box, Paper } from "@mui/material";
import { VideoPlayer } from "./video-player";
import { VideoInfo } from "./video-info";
import { ViewControl } from "./view-control";
import { VideoList } from "./video-list";

export const Videos = () => {
  return (
    <Provider>
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <Box
          sx={{ bgcolor: "black", display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ width: ["100%", "70%"] }}>
            <VideoPlayer />
          </Box>
        </Box>
        <Paper sx={{ p: 2 }}>
          <ViewControl />
        </Paper>
      </Box>
      <VideoList />
    </Provider>
  );
};

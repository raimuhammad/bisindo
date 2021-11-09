import { useContent } from "./content.context";
import { Box, Typography, Button } from "@mui/material";
import { Videos } from "./videos";

const EmptyInfo = () => {
  const [_, { changeTab }] = useContent();
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography>Batch ini belum memiliki video pelajaran</Typography>
      <Button
        onClick={changeTab("add-video")}
        sx={{ textTransform: "none" }}
        size="large"
      >
        Klik disini untuk upload video
      </Button>
    </Box>
  );
};

export const ContentVideos = () => {
  const [{ isEmpty }] = useContent();

  return <>{isEmpty ? <EmptyInfo /> : <Videos />}</>;
};

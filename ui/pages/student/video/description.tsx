import { useVideo } from "./provider";
import { DraftJsViewer } from "@components/draft-js-viewer";
import { Box } from "@mui/material";

export const Description = () => {
  const { video } = useVideo();
  return (
    <Box sx={{ mb: 1, p: 1 }}>
      <DraftJsViewer data={video.description as string} />
    </Box>
  );
};

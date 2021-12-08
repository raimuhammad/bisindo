import { useVideo } from "./provider";
import { DraftJsViewer } from "@components/draft-js-viewer";
import {Typography, Box, Theme} from "@mui/material";

export const Description = () => {
  const { video } = useVideo();
  return (
    <Box sx={{pt:2, mb:1}}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bolder" }}>
        Deskripsi video
      </Typography>
      <Box sx={{borderRadius: 2,p:1, border: "solid 1px", borderColor: (t: Theme)=>t.palette.grey.A400}}>
        <DraftJsViewer data={video.description as string} />
      </Box>
    </Box>
  );
};

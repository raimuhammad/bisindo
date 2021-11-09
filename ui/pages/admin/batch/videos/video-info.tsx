import { useVideoContext } from "./provider";
import { Typography, Paper } from "@mui/material";

export const VideoInfo = () => {
  const [{ video }] = useVideoContext();

  if (!video) {
    return <></>;
  }

  return (
    <Paper sx={{p:2}}>
      <Typography variant="h4">{video.title}</Typography>
      <Typography>{video.caption}</Typography>
    </Paper>
  );
};

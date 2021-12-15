import { Theme, Typography } from "@mui/material";
import { useVideo } from "./provider";

export const Header = () => {
  const { video } = useVideo();
  return (
    <div>
      <Typography
        sx={{
          color: (t: Theme) => t.palette.grey["700"],
        }}
        variant="h3"
      >
        {video?.title}
      </Typography>
      <Typography
        sx={{
          color: (t: Theme) => t.palette.grey["700"],
        }}
        variant="subtitle1"
      >
        {video?.caption}
      </Typography>
    </div>
  );
};

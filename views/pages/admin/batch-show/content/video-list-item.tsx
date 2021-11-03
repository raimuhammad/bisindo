import { VideoModelType } from "@root/models";
import { Box, Button, Paper, Typography } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";

type Props = {
  model: VideoModelType;
};

export const styles = {
  root: {
    width: { sm: "100%", lg: "25%" },
    marginY: 2,
    padding: {
      lg: 2,
      sm: 1,
    },
    paddingTop: 0,
    minHeight: 240,
  },
};

export const VideoListItem = ({
  model: { id, title, durationText, caption, thumbnail },
}: Props) => {
  return (
    <>
      <Box sx={styles.root} key={id}>
        <Paper
          component="img"
          elevation={10}
          sx={{ width: "100%", borderRadius: 5 }}
          src={thumbnail}
          alt=""
        />
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ display: "block" }}>
          {durationText}
        </Typography>
        <Typography sx={{ display: "block" }} variant="caption">
          {caption}
        </Typography>
        <Button
          variant="contained"
          startIcon={<PlayCircle />}
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          Tampilkan video
        </Button>
      </Box>
    </>
  );
};

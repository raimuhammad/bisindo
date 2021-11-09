import type { VideoModelType } from "@root/models";
import { useContent } from "../content.context";
import { observer } from "mobx-react";
import { Box, Typography, IconButton } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useVideoContext } from "./provider";
import { Fragment } from "react";

const sx = {
  position: "relative",
  "& > .overlay": {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "all ease-in-out .4s",
    background: "rgba(0,0,0,0.35)",
    "&> *": {
      color: "white",
    },
    cursor: "pointer",
  },
  "&:hover": {
    "& > .overlay": {
      opacity: 1,
    },
    "& > img": {
      // opacity: 0,
    },
  },
};

const VideoBox = observer(
  ({ model, onClick }: { model: VideoModelType; onClick: () => void }) => {
    return (
      <Box sx={{ width: ["100%", "48%", "20%"] }}>
        <Box sx={{ p: 1 }} onClick={onClick}>
          <Box sx={sx as any}>
            <div className="overlay">
              <IconButton>
                <PlayArrow />
              </IconButton>
            </div>
            <Box
              component="img"
              sx={{ width: "100%" }}
              src={model.thumbnail}
              alt=""
            />
          </Box>
          <Typography>{model.title}</Typography>
          <Typography variant="caption">{model.caption}</Typography>
        </Box>
      </Box>
    );
  }
);

export const VideoList = observer(() => {
  const [{ data }] = useContent();
  const [{ video }, { changeVideo }] = useVideoContext();

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {data.map((item) =>
        video && video.id === item.id ? (
          <Fragment key={item.id} />
        ) : (
          <VideoBox key={item.id} onClick={changeVideo(item)} model={item} />
        )
      )}
    </Box>
  );
});

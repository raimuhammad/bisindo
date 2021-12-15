// @flow
import * as React from "react";
import { VideoModelType } from "@root/models";
import { Box, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

type Props = {
  video: VideoModelType;
  handler(): void;
  selected: boolean;
  index: number;
};
export const VideoListItem = ({
  handler,
  selected,
  video: item,
  index,
}: Props) => {
  return (
    <ListItem
      onClick={handler}
      data-selected={selected}
      sx={{
        px: 0,
        transition: "all ease .5s",
        "&[data-selected='true']": {
          "& > * > *": {
            color: "white",
          },
          bgcolor: "primary.main",
        },
      }}
      dense
      button
    >
      <ListItemIcon
        sx={{ opacity: selected ? 1 : 0, transition: "all ease .5s" }}
      >
        <PlayArrow />
      </ListItemIcon>
      <ListItemText
        secondary={item.durationText}
        primary={`${index + 1}. ${item.title}`}
      />
      <ListItemIcon sx={{ px: 0 }}>
        <Box
          component="img"
          src={item.thumbnail}
          sx={{ height: 50, width: 50 }}
        />
      </ListItemIcon>
    </ListItem>
  );
};

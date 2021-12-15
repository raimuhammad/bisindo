import type { VideoModelType } from "@root/models";
import { observer } from "mobx-react";
import { List, Typography, Divider } from "@mui/material";
import { VideoListItem } from "./video-list-item";

type Props = {
  videos: VideoModelType[];
  onItemClick(v: VideoModelType): void;
  selected?: VideoModelType | null;
};
export const VideoListRenderer = observer(
  ({ onItemClick, videos, selected }: Props) => {
    const handler = (video: VideoModelType) => {
      return () => onItemClick(video);
    };
    const total = videos.reduce((n, v) => {
      return n + (v.duration as number);
    }, 0);
    const minutes = Math.floor(total / 60);

    return (
      <>
        <Typography
          align="right"
          variant="caption"
          sx={{ fontWeight: "bolder", display: "block" }}
        >
          {videos.length} video ({minutes} menit)
        </Typography>
        <Divider sx={{ my: 1 }} />
        <List dense sx={{ py: 0 }}>
          {videos.map((item, index) => (
            <VideoListItem
              key={item.id}
              video={item}
              handler={handler(item)}
              selected={selected ? selected.id === item.id : false}
              index={index}
            />
          ))}
        </List>
      </>
    );
  }
);

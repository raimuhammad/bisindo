import * as React from "react";
import { useStudyPage } from "./study-page-provider";
import { makeStyles, Paper } from "@material-ui/core";

type CardProps = {
  video: gapi.client.youtube.Video;
  onClick(): void;
};

const useClasses = makeStyles((theme) => ({
  container: {
    height: "70vh",
    overflowY: "scroll",
    marginRight: theme.spacing(2),
  },
  root: {
    display: "flex",
    marginBottom: theme.spacing(2),
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#dbdbdb",
    },
  },
  imageContainer: {
    width: "30%",
    backgroundColor: "red",
  },
  image: {
    top: 0,
    left: 0,
  },
  img: {
    borderRadius: theme.shape.borderRadius,
    width: "100%",
  },
  infoContainer: {
    width: "70%",
    padding: theme.spacing(2),
  },
}));

const VideoCard = ({ video, onClick }: CardProps) => {
  const classes = useClasses();
  return (
    <div role="button" onClick={onClick} className={classes.root}>
      <div className={classes.imageContainer}>
        <img
          className={classes.img}
          src={video.snippet?.thumbnails?.default?.url as string}
        />
      </div>
      <div className={classes.infoContainer}>
        <p>{video.snippet?.title}</p>
      </div>
    </div>
  );
};

export const VideoList = () => {
  const { videos, handleChangeVideo } = useStudyPage();
  const classes = useClasses();

  const handler = (video: any) => {
    return () => handleChangeVideo(video);
  };
  return (
    <Paper className={classes.container}>
      {videos.map((item) => (
        <VideoCard
          onClick={handler(item as CardProps["video"])}
          video={item as CardProps["video"]}
          key={item.id?.videoId as string}
        />
      ))}
    </Paper>
  );
};

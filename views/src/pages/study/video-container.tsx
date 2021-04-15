import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { useStudyPage } from "./study-page-provider";
import { VideoInfoContainer } from "./video-info-container";
import { Teather } from "./teather";

import {
  useYoutubePlayer,
  YoutubePlayerProvider,
} from "providers/youtube-player-provider";

const useClasses = makeStyles((theme) => ({
  videoWrapper: {
    paddingInline: theme.spacing(3),
  },
  playerContainer: {
    position: "relative",
    paddingTop: "56.25%",
    backgroundColor: "#181818",
  },
}));

const Wrapper = () => {
  const { video } = useStudyPage();
  const { video: youtubeVideo, loadVideo } = useYoutubePlayer();
  const classes = useClasses();
  React.useEffect(() => {
    if (video && video.id?.videoId) {
      loadVideo(video.id.videoId);
    }
  }, [video]);
  return !youtubeVideo || !video ? null : (
    <>
      <div className={classes.playerContainer}>
        <Teather video={youtubeVideo} />
      </div>
      <div>
        <VideoInfoContainer video={youtubeVideo} />
      </div>
    </>
  );
};

export const VideoContainer = () => {
  const classes = useClasses();
  return (
    <>
      <YoutubePlayerProvider>
        <div className={classes.videoWrapper}>
          <Wrapper />
        </div>
      </YoutubePlayerProvider>
    </>
  );
};

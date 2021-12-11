import { useVideo } from "./provider";
import { VideoPlayer } from "@components/video-player";
export const VideoContainer = () => {
  const { video, videoUtilities } = useVideo();


  return (
    <div>
      <VideoPlayer
        playerRef={videoUtilities.playerRef}
        url={video.content as string}
      />
    </div>
  );
};

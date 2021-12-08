import { useVideo } from "./provider";
import { VideoPlayer } from "@components/video-player";
export const VideoContainer = () => {
  const { video } = useVideo();
  return (
    <div>
      <VideoPlayer url={video.content as string} />
    </div>
  );
};

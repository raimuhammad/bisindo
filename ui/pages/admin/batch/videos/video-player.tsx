import { useVideoContext } from "./provider";
import { VideoPlayer as Player } from "@components/video-player";

export const VideoPlayer = () => {
  const [{ video }] = useVideoContext();
  return (
    <>
      <Player url={video ? (video.content as string) : ""} />
    </>
  );
};

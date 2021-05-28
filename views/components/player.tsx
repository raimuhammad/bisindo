import { useAspectRatioBox } from "@hooks/use-aspect-ratio-box";
import ReactPlayer from "react-player";
import * as React from "react";

type PlayerProps = {
  url: string;
  onContainerClick(): void;
  play: boolean;
  enableFullScreen?: boolean;
  height?: number;
};

export const Player = ({
  url,
  play,
  onContainerClick,
  enableFullScreen = true,
  height,
}: PlayerProps) => {
  const { nodeRef, style } = useAspectRatioBox();
  const attributes = {
    controlsList: `nodownload ${!enableFullScreen ? "nofullscreen" : ""}`,
  };
  const commonProps = {
    controls: true,
    config: {
      file: {
        attributes,
      },
    },
  };
  return (
    <div ref={nodeRef}>
      <div onClick={onContainerClick}>
        <ReactPlayer
          height={height}
          playing={play}
          url={url}
          width="100%"
          {...commonProps}
        />
      </div>
    </div>
  );
};

import { useAspectRatioBox } from "hooks/use-aspect-ratio-box";
import ReactPlayer from "react-player";
import * as React from "react";

type PlayerProps = {
  url: string;
  onContainerClick(): void;
  play: boolean;
};

const attributes = {
  controlsList: "nodownload nofullscreen",
};
const commonProps = {
  controls: true,
  config: {
    file: {
      attributes,
    },
  },
};

export const Player = ({ url, play, onContainerClick }: PlayerProps) => {
  const { nodeRef, style } = useAspectRatioBox();
  return (
    <div ref={nodeRef}>
      <div onClick={onContainerClick} style={style}>
        <ReactPlayer playing={play} url={url} {...style} {...commonProps} />
      </div>
    </div>
  );
};

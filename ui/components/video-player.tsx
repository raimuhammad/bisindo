import "@vime/core/themes/default.css";
import "@vime/core/themes/light.css";
import {
  Player as Vime,
  Video,
  Ui,
  Controls,
  ScrubberControl,
  PlaybackControl,
  VolumeControl,
  ControlGroup,
  TimeProgress,
  usePlayer,
} from "@vime/react";
import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { useToggle } from "@hooks/use-toggle";

type Props = {
  url: string;
  onPlaying?(v: number): void;
  play?: boolean;
};

export const VideoPlayer = ({ url, onPlaying, play = false }: Props) => {
  const playerRef = useRef<HTMLVmPlayerElement | null>(null);
  return (
    <Box>
      <Vime
        playsinline
        ref={playerRef}
        onVmCurrentTimeChange={(e) =>
          onPlaying
            ? setTimeout(() => {
                onPlaying(parseInt(e.detail.toFixed(1)));
              }, 1000)
            : null
        }
      >
        {url ? (
          <Video crossOrigin="">
            <source data-src={url} />
          </Video>
        ) : (
          <></>
        )}
        <Ui>
          <Controls fullWidth>
            <ControlGroup>
              <ScrubberControl />
            </ControlGroup>
            <ControlGroup space="top">
              <PlaybackControl />
              <VolumeControl />
              <TimeProgress separator="/" />
            </ControlGroup>
          </Controls>
        </Ui>
      </Vime>
    </Box>
  );
};

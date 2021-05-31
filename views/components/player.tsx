/* eslint-disable */
import { useAspectRatioBox } from "@hooks/use-aspect-ratio-box";
import * as React from "react";
import "@vime/core/themes/default.css";
import "@vime/core/themes/light.css";
import {
  Player as Vime,
  Video,
  PlayerProps as P,
  Ui,
  Controls,
  ScrubberControl,
  PlaybackControl,
  VolumeControl,
  ControlGroup,
  TimeProgress,
} from "@vime/react";
import { useEffect, useRef } from "react";

type PlayerProps = {
  url: string;
  onContainerClick(): void;
  play: boolean;
  onPlaying?(time: number): void;
};

export const Player = ({
  url,
  onContainerClick,
  play,
  onPlaying,
}: PlayerProps) => {
  const p = {};
  const playerRef = useRef<HTMLVmPlayerElement | null>(null);
  console.log(playerRef.current);
  useEffect(() => {
    if (playerRef.current) {
      if (play) {
        playerRef.current?.play();
      } else {
        console.log("paused");
        playerRef.current?.pause();
      }
    }
  }, [play, playerRef]);

  return (
    <div onClick={onContainerClick}>
      <Vime
        playsinline
        ref={playerRef}
        {...p}
        onVmCurrentTimeChange={(e) =>
          onPlaying
            ? setTimeout(() => {
                onPlaying(parseInt(e.detail.toFixed(1)));
              }, 1000)
            : null
        }
      >
        <Video style={{ height: 200 }} crossOrigin="">
          <source data-src={url} />
        </Video>
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
    </div>
  );
};

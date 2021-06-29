/* eslint-disable */
import * as React from "react";
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
  useEffect(() => {
    if (playerRef.current) {
      if (play) {
        playerRef.current?.play();
      } else {
        playerRef.current?.pause();
      }
    }
  }, [play, playerRef]);

  return (
    <>
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
        <Video crossOrigin="">
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
    </>
  );
};

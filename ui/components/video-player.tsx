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
  usePlayerContext,
} from "@vime/react";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import {useToggle} from "@hooks/use-toggle";

type Props = {
  url: string;
  onPlaying?(v: number): void;
  play?: boolean;
  playOnTime?: number;
};

export const VideoPlayer = ({
  url,
  onPlaying,
  play = false,
  playOnTime,
}: Props) => {
  const playerRef = useRef<HTMLVmPlayerElement | null>(null);
  const [isPlaying, {toggle, inline}] = useToggle(play);
  useEffect(() => {
    if (playOnTime) {
      inline(false);
    }
    const val : HTMLVmPlayerElement = playerRef.current as HTMLVmPlayerElement;
    if (val && playOnTime){
      val.pause().then(()=>{
        val.callAdapter('setCurrentTime', playOnTime).catch(console.log);
      });
    }
  }, [playOnTime, playerRef]);
  const onTimeUpdate = (e: CustomEvent<number>) => {
    onPlaying
      ? setTimeout(() => {
          onPlaying(parseInt(e.detail.toFixed(1)));
        }, 1000)
      : null;
  };
  return (
    <Box>
      <Vime playsinline ref={playerRef} onVmCurrentTimeChange={onTimeUpdate}>
        {url ? (
          <Video crossOrigin="use-credentials">
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

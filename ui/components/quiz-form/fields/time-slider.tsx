import * as React from "react";
import { useToggle } from "@hooks/use-toggle";
import { Box, FormLabel, Slider, Typography } from "@mui/material";
import { getDurationTimeText } from "@utils/get-duration-time";
import { VideoPlayer } from "../../video-player";
import { useQuizForm } from "../provider";
import { useController } from "react-hook-form";
import { useEffect } from "react";

export const TimeSlider = () => {
  const { video } = useQuizForm();
  const [val, setVal] = React.useState(0);
  const handleChange = (e: any, v: any) => setVal(v);
  const [play, { toggle }] = useToggle(false);
  const control = useController({
    name: "showAt",
    defaultValue: 0,
  });
  useEffect(() => {
    control.field.onChange(val);
  }, [val]);

  return (
    <Box paddingY={2}>
      <VideoPlayer url={video.content as string} play={play} playOnTime={val} />
      <Box marginTop={1}>
        <FormLabel>Di tampilkan pada menit</FormLabel>
        <Box>
          <Slider
            min={0}
            max={video.duration}
            track={false}
            onChange={handleChange}
            valueLabelDisplay="off"
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2">{getDurationTimeText(0)}</Typography>
          <Typography variant="subtitle2">
            {getDurationTimeText(val)}
          </Typography>
          <Typography variant="subtitle2">
            {getDurationTimeText(video.duration as number)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

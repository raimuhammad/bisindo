import { useFormContext } from "react-hook-form";
import * as React from "react";
import { Box, FormLabel, Slider, Typography } from "@mui/material";
import { useToggle } from "@hooks/use-toggle";
import { VideoModelType } from "@root/models";
import { Player } from "@components/player";
import { getDurationTimeText } from "@utils/get-duration-time";

export const TimeSlider = ({ model }: { model: VideoModelType }) => {
  const form = useFormContext();
  const [val, setVal] = React.useState(() => {
    const v = form.getValues("showAt");
    return v ?? 0;
  });
  const handleChange = (e: any, v: any) => setVal(v);

  React.useEffect(() => {
    form.register("showAt");
  }, []);

  React.useEffect(() => {
    if (val) {
      form.setValue("showAt", val);
    }
  }, [val]);
  const [play, { toggle }] = useToggle(false);
  return (
    <Box paddingY={2}>
      <Player
        url={model.content as string}
        onContainerClick={toggle}
        play={play}
      />
      <Box marginTop={1}>
        <FormLabel>Di tampilkan pada menit</FormLabel>
        <Box>
          <Slider
            min={0}
            max={model.duration}
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
            {getDurationTimeText(model.duration as number)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
